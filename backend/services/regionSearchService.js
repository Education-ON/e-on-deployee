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
    const allRegions = [];

    let pageNo = 1;
    const numOfRows = 1000;
    let totalCount = 0;

    try {
        // const firstPageParams = {
        //     ServiceKey: apiKey,
        //     pageNo: 0,
        //     numOfRows: 1000,
        //     type: "json",
        // };

        // const res = await axios.get(url, {
        //     params: firstPageParams,
        // });
        // console.log("1페이지 응답:", res.data);
        // return res.data;

        do {
            const params = {
                ServiceKey: apiKey,
                pageNo,
                numOfRows,
                type: "json",
            };

            const res = await axios.get(url, {
                params,
            });
            const resData = res.data;
            const stanReginCd = resData.StanReginCd;

            // 헤더에서 totalCount 읽기
            const head = stanReginCd[0].head[0];
            totalCount = parseInt(head.totalCount, 10);

            // 실질 데이터
            const regions = stanReginCd[1].row;

            // 데이터 저장
            allRegions.push(...regions);

            // console.log(pageNo);
            pageNo++;
        } while (allRegions.length < totalCount);
        // console.log("전체 조회 완료");
        // console.log("데이터 출력 중");
        return allRegions;
    } catch (error) {
        console.error("전체 지역 조회 API 호출 실패");
        throw new Error("전체 지역 조회 API 호출 실패");
    }
}

// 5. API에서 시군구만 추출하기
function extractSigungu(regions) {
    const guParentSet = new Set();

    // 1. 구 단위가 있는 지역의 상위 코드(시)를 모은다
    regions.forEach((region) => {
        const isGu =
            region.sgg_cd !== "000" &&
            region.umd_cd === "000" &&
            region.locatadd_nm.includes("구");

        if (isGu) {
            guParentSet.add(region.locathigh_cd); // '구'의 상위 시 코드 저장
        }
    });

    return regions.filter((region) => {
        const isSigunguLevel =
            region.sgg_cd !== "000" && region.umd_cd === "000";

        const isGu = region.locatadd_nm.includes("구");
        const isParentOfGu = guParentSet.has(region.region_cd); // 이 지역이 '구'를 자식으로 가진 시인가?

        // 조건:
        // - 구는 포함
        // - 하위에 구가 없는 시만 포함
        return isSigunguLevel && (isGu || !isParentOfGu);
    });
}

// function extractSigungu(regions) {
//     const guParentSet = new Set();

//     // 5-1. 구 단위가 있는 경우 → 그 상위 시 코드 기록
//     regions.forEach((region) => {
//         if (
//             region.sgg_cd !== "000" &&
//             region.umd_cd === "000" &&
//             region.locatadd_nm.includes("구")
//         ) {
//             guParentSet.add(region.locathigh_cd); // 구의 상위 시 코드
//         }
//     });

//     // 5-2. 필터링 조건 적용
//     return regions.filter((region) => {
//         const isSigunguLevel =
//             region.sgg_cd !== "000" && region.umd_cd === "000";
//         const hasGu = guParentSet.has(region.region_cd);
//         const isGuOfCity =
//             guParentSet.has(region.locathigh_cd) &&
//             region.locatadd_nm.includes("구");

//         // 시군구 단위면서,
//         return isSigunguLevel && (!hasGu || isGuOfCity);
//     });
// }

// 6. 시군구까지만 필터링해서 반환하는 함수
async function saveSigungusToDB(allRegions) {
    // 6-1. 시군구만 필터링
    const sigungus = extractSigungu(allRegions);

    // 6-2. bulkInsert용 배열 생성
    const regionData = sigungus.map((region) => ({
        region_id: parseInt(region.region_cd, 10),
        region_name: region.locatadd_nm,
    }));

    console.log(regionData);
    return regionData;

    try {
        await Region.bulkCreate(regionData, {
            ignoreDuplicates: true, // 이미 있는 값은 무시
        });
        console.log("시군구 지역 DB 저장 완료");
    } catch (error) {
        console.error("❌ DB 저장 실패:", error);
        throw error;
    }
}

// 7. 전체 통합 실행 함수
async function updateRegionsFromAPI() {
    const allRegions = await getAllRegionFromAPI(); // API에서 전체 데이터 가져오기
    await saveSigungusToDB(allRegions); // DB 저장
}

module.exports = {
    getAllRegions,
    getRegionByName,
    getRegionById,
    getAllRegionFromAPI,
    updateRegionsFromAPI,
};
