const express = require('express');
const router = express.Router();
const mySchoolController = require('../controllers/mySchoolController');

// 1. 나의 학교 저장
router.post('/save', mySchoolController.saveMySchool);

// 2. 나의 학교 삭제
router.post('/delete', mySchoolController.deleteMySchool);

// 3. 나의 학교 조회
router.get('/get', mySchoolController.getMySchool);

module.exports = router;