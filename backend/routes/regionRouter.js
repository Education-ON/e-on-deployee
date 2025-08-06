const express = require("express");
const router = express.Router();
const regionController = require("../controllers/regionController");

router.get("/", regionController.getAllRegions); // 모든 지역 정보 조회 API
router.get("/search", regionController.getRegionByName); // 지역 이름(쿼리 스트링 이용)으로 지역 정보 조회 API
router.get("/allRegion", regionController.getAllRegionFromAPI);

// 동적 라우트는 마지막에
router.get("/:region_id", regionController.getRegionById); // 지역 ID로 지역명 검색

module.exports = router;
