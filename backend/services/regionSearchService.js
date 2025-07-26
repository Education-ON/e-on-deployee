const db = require('../models');
const Region = db.Region;
const { Op } = require("sequelize");

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
};

// 3. id로 지역 이름 조회 API
async function getRegionById(region_id) {
    return await Region.findOne({
        where: { region_id },
        attributes: ["region_name"], // 지역 이름만 반환
    });
}

module.exports = {
    getAllRegions,
    getRegionByName,
    getRegionById,
};