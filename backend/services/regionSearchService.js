const db = require("../models");
const Region = db.Region;
const { Op } = require("sequelize");

const axios = require("axios");
const apiKey = process.env.REGION_API_KEY;

// 1. DB 내 모든 지역 정보 조회 API
async function getAllRegions() {
    return await Region.findAll({ order: [["region_id", "ASC"]] });
}

// 2. query string으로 지역 정보 조회 API
async function getRegionByName(region_name) {
    return await Region.findAll({
        where: {
            region_name: {
                [Op.like]: `%${region_name}%`, // 부분 일치 검색 가능
            },
        },
        order: [["region_id", "ASC"]], // 지역 id 기준 오름차순 정렬
    });
}

// 3. id로 지역 이름 조회 API
async function getRegionById(region_id) {
    return await Region.findOne({
        where: { region_id },
        attributes: ["region_name"], // 지역 이름만 반환
    });
}

// 4. 외부 API 사용해서 전국 지역명 조회
async function getAllRegionFromAPI() {
    const url = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
    const all = [];
    let pageNo = 1;
    const numOfRows = 1000;
    let totalCount = 0;

    try {
        while (true) {
            const params = {
                ServiceKey: apiKey,
                pageNo,
                numOfRows,
                type: "json",
            };

            const { data } = await axios.get(url, { params });
            const pack = data?.StanReginCd;
            if (!Array.isArray(pack) || !pack[1]?.row) {
                throw new Error("Unexpected API shape");
            }

            const head = pack[0]?.head?.[0];
            totalCount = parseInt(head?.totalCount ?? "0", 10);

            const rows = pack[1].row;
            all.push(...rows);

            // 다음 페이지
            if (all.length >= totalCount) break;
            pageNo++;
        }

        // 안전하게 정렬(숫자 오름차순)
        all.sort((a, b) => Number(a.region_cd) - Number(b.region_cd));
        return all;
    } catch (e) {
        console.error("전체 지역 조회 API 호출 실패:", e.message);
        throw new Error("전체 지역 조회 API 호출 실패");
    }
}

// 코드 정규화 유틸
const norm10 = (v) => String(v).trim().padStart(10, "0");
const norm3 = (v) => String(v).trim().padStart(3, "0");

// 화이트리스트: '구가 없는 시' (옛 구 레코드는 제거, 시 레벨은 반드시 포함)
const NO_GU_CITIES = new Set(["경기도 부천시", "세종특별자치시"]);

// "경기도 부천시 원미구" -> "경기도 부천시"
const baseCityNameFromGu = (fullName = "") => {
    const parts = String(fullName).trim().split(/\s+/);
    if (parts.length >= 2 && parts[parts.length - 1].endsWith("구")) {
        parts.pop();
        return parts.join(" ");
    }
    return null;
};

function extractSigungu(regions) {
    const rows = regions.map((r) => ({
        ...r,
        region_cd: norm10(r.region_cd),
        locathigh_cd: norm10(r.locathigh_cd),
        sgg_cd: norm3(r.sgg_cd),
        umd_cd: norm3(r.umd_cd),
        locatadd_nm: String(r.locatadd_nm || "").trim(),
    }));

    // 1) ‘구’ 존재 도시 판정용 집합(코드/이름 기준)
    const cityWithGuByCode = new Set();
    const cityWithGuByName = new Set();

    rows.forEach((r) => {
        const name = r.locatadd_nm;
        const isGu =
            r.umd_cd === "000" && r.sgg_cd !== "000" && name.endsWith("구");

        if (!isGu) return;

        // 부천/세종 등 구 없는 시의 옛 구 레코드는 무시
        const base = baseCityNameFromGu(name);
        if (base && NO_GU_CITIES.has(base)) {
            return; // ‘구가 있는 도시’ 판정에 사용하지 않음
        }

        // 일반 케이스는 ‘구가 있는 도시’로 판정
        cityWithGuByCode.add(r.locathigh_cd);
        if (base) cityWithGuByName.add(base);
    });

    // 2) 시·군·구 레벨만 남기고 규칙 적용
    const out = rows.filter((r) => {
        const isSigunguLevel = r.sgg_cd !== "000" && r.umd_cd === "000";
        if (!isSigunguLevel) return false;

        const name = r.locatadd_nm;
        const isGu = name.endsWith("구");

        // 2-1) 부천/세종의 ‘구’ 레벨은 반드시 제외 (옛 구 제거)
        if (isGu) {
            const base = baseCityNameFromGu(name);
            if (base && NO_GU_CITIES.has(base)) {
                return false;
            }
        }

        // 2-2) 부천/세종의 ‘시’ 레벨은 반드시 포함
        if (NO_GU_CITIES.has(name)) {
            return true;
        }

        // 2-3) 일반 규칙
        const isCityWithGuByCode = cityWithGuByCode.has(r.region_cd);
        const isCityWithGuByName = cityWithGuByName.has(name);
        // 구는 포함 / 구가 있는 ‘시’는 제외 / 구가 없는 시·군은 포함
        return isGu || (!isCityWithGuByCode && !isCityWithGuByName);
    });

    // 3) 정렬 + 필드 축소
    out.sort((a, b) => Number(a.region_cd) - Number(b.region_cd));
    return out.map((r) => ({
        region_cd: r.region_cd,
        locatadd_nm: r.locatadd_nm,
    }));
}

// 6. 시군구까지만 필터링해서 전체 로그 출력
// async function logAllSigungus(allRegions) {
//     // 1) 시군구만 추출
//     const sigungus = extractSigungu(allRegions).map((r) => ({
//         region_id: parseInt(String(r.region_cd), 10),
//         region_name: String(r.locatadd_nm),
//     }));

//     // 2) 전체 개수 및 샘플 출력
//     console.log("📌 전국 시군구 개수:", sigungus.length);
//     console.log("📌 전국 시군구 샘플 20개:", sigungus.slice(0, 20));

//     // 3) 시도별 카운트
//     const bySido = sigungus.reduce((acc, cur) => {
//         const sido = cur.region_name.split(" ")[0]; // 첫 단어를 시도명으로
//         acc[sido] = (acc[sido] || 0) + 1;
//         return acc;
//     }, {});

//     console.log("📌 시도별 시군구 개수:", bySido);

//     // 필요하면 전체 목록까지
//     // console.log("📌 전국 시군구 전체 목록:", sigungus);

//     // ▶ 풀출력으로 교체
//     console.log("📌 전국 시군구 전체 목록(전체 표시):");
//     console.dir(sigungus, { depth: null, maxArrayLength: null });
// }

// 7. 전체 실행
async function updateRegionsFromAPI() {
    const allRegions = await getAllRegionFromAPI();

    // 1) 시군구만 추출
    const sigungus = extractSigungu(allRegions).map((r) => ({
        region_id: parseInt(String(r.region_cd), 10),
        region_name: String(r.locatadd_nm),
    }));

    // 2) DB 저장
    try {
        await Region.bulkCreate(sigungus, {
            ignoreDuplicates: true, // 이미 있는 값은 무시
        });
        console.log(`✅ ${sigungus.length}개 시군구 저장 완료`);

        return sigungus;
    } catch (error) {
        console.error("❌ DB 저장 실패:", error);
        throw error;
    }
}

module.exports = {
    getAllRegions,
    getRegionByName,
    getRegionById,
    getAllRegionFromAPI,
    updateRegionsFromAPI,
};
