const { normalizeRegionName } = require("./regionNameNormalizer");

// 전체 지역에서 시군구까지 추출하는 함수
function extractDistrict(address) {
    // 비어있을 경우 처리
    if (!address) return null;

    // 명칭 정규화
    address = normalizeRegionName(address);

    // 1. 세종특별자치시 단독 처리
    if (address.startsWith("세종특별자치시")) {
        return "세종특별자치시";
    }

    // 2. "특별시/광역시/특별자치시/특별자치도/도 + 시/군/구" (시 뒤에 구 있을 수 있음)
    const regex =
        /^(?<province>[가-힣]+(?:특별시|광역시|특별자치도|도))\s(?<city>[가-힣]+시|[가-힣]+군|[가-힣]+구)(?:\s(?<district>[가-힣]+구))?/;
    const match = address.match(regex);

    if (!match) return null;

    const { province, city, district } = match.groups;

    // 시 + 구 형태
    if (city.endsWith("시") && district) {
        return `${province} ${city} ${district}`;
    }

    // 나머지는 시/군/구까지만
    return `${province} ${city}`;
}

module.exports = {
    extractDistrict,
};
