// 지역명 정규화
const PROVINCE_ALIASES = [
    // 왼쪽/오른쪽 어느 쪽이 와도 오른쪽으로 통일
    ["강원도", "강원특별자치도"],
    ["전라북도", "전북특별자치도"],
    // 필요시 추가
];

function normalizeProvinceAliases(s = "") {
    let out = s.trim();
    for (const [oldName, canonical] of PROVINCE_ALIASES) {
        // 양방향 대응: old→canonical, canonical→canonical
        out = out
            .replace(new RegExp(oldName, "g"), canonical)
            .replace(new RegExp(canonical, "g"), canonical);
    }
    return out;
}

function normalizeRegionName(s = "") {
    // 공백 정리까지
    return normalizeProvinceAliases(s).replace(/\s+/g, " ").trim();
}

module.exports = { normalizeRegionName, normalizeProvinceAliases };
