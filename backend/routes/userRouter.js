// backend/routes/user.js
const express = require("express");
const {
  getMyInfo,
  updateMyInfo,
  changePassword,
  deactivateAccount,
  deleteAccount,
  getMyBoardRequests,
  getAllUserStatus,
  updateUserStatus,
} = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

// 내 정보 조회
router.get("/me", isLoggedIn, getMyInfo);

// 내 정보 수정
router.put("/me", isLoggedIn, updateMyInfo);

// 비밀번호 변경
router.put("/me/password", isLoggedIn, changePassword);

// 계정 비활성화
router.delete("/me", isLoggedIn, deleteAccount);

// 계정 탈퇴
router.patch("/me/deactivate", isLoggedIn, deactivateAccount);

// 내 게시판 개설 신청 조회
router.get('/board-requests/me', isLoggedIn, getMyBoardRequests);

// 전체 사용자 계정 상태 조회 (관리자용)
router.get('/status', isLoggedIn, getAllUserStatus);

// 사용자 계정 상태 업데이트 (관리자용)
router.patch('/status/:user_id', isLoggedIn, updateUserStatus);

module.exports = router;
