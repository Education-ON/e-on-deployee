const express = require('express');
const router = express.Router();
const schoolScheduleController = require('../controllers/schoolScheduleController');

// 1. 학교 검색 (예: /schools?query=고등학교)
router.get('/schools', schoolScheduleController.searchSchools);

// 2. 학사 일정 조회 (예: /schools/7010569/schedule 또는 /schools/7010569/schedule?year=prev&grade=3)
router.get('/schools/:schoolId/schedule', schoolScheduleController.getSchedule);

module.exports = router;