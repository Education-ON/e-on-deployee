const db = require("../models");
// const regionService = db.regionSearchService;
const regionService = require("../services/regionSearchService");

// 1. DB 내 모든 지역 정보 조회 API
exports.getAllRegions = async (req, res) => {
    try {
        const regions = await regionService.getAllRegions();
        res.status(200).json({
            status: "success",
            data: {
                regions,
            },
        });
    } catch (error) {
        console.error("❌ 지역 조회 실패:", error.message);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 2. query string으로 지역 정보 조회 API
exports.getRegionByName = async (req, res) => {
    const { region_name } = req.query;

    if (!region_name || region_name.trim() === "") {
        return res.status(400).json({
            status: "fail",
            message: "region_name 쿼리 파라미터가 필요합니다.",
        });
    }

    // region_name이 있는 경우만 처리
    try {
        const regions = await regionService.getRegionByName(region_name);

        // 검색 결과가 없을 경우 처리
        if (regions.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "조건에 맞는 지역을 찾을 수 없습니다.",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                regions,
            },
        });
    } catch (error) {
        console.error("❌ 지역 조회 실패:", error.message);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// 3. id로 지역 이름 조회 API
exports.getRegionById = async (req, res) => {
    console.log("req.params:", req.params);
    const region_id = req.params.region_id;

    if (!region_id) {
        return res.status(400).json({
            status: "fail",
            message: "region_id 쿼리 파라미터가 필요합니다.",
        });
    }

    try {
        const region = await regionService.getRegionById(region_id);

        // 지역이 존재하지 않는 경우 처리
        if (!region) {
            return res.status(404).json({
                status: "fail",
                message: "해당 ID의 지역을 찾을 수 없습니다.",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                region_name: region.region_name,
            },
        });
    } catch (error) {
        console.error("❌ 지역 조회 실패:", error.message);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.getAllRegionFromAPI = async (req, res) => {
    try {
        const regions = await regionService.getAllRegionFromAPI();
        res.status(200).json({
            status: "success",
            data: {
                regions,
            },
        });
    } catch (error) {
        console.error("❌ 전체 지역 조회 실패:", error.message);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.updateRegionsFromAPI = async (req, res) => {
    try {
        const regions = await regionService.updateRegionsFromAPI();
        res.status(200).json({
            status: "success",
            data: {
                regions,
            },
        });
    } catch (error) {
        console.error("❌ 전체 지역 업데이트 실패:", error.message);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
