// routes/boardRoute.js   (community 라우트)

const express = require("express");
const router  = express.Router();
const upload  = require("../middleware/upload");
const banCheck = require("../middleware/banCheck");
const board   = require("../controllers/boardController");

// ───────── 읽기 전용 (제한 無) ─────────
router.get("/",                      board.getBoardList);   // 게시판 목록
router.get("/:board_id/posts",       board.getBoardPost);   // 게시글 목록
router.get("/posts/:post_id",        board.getPost);        // 게시글 상세
router.get("/board-requests",        board.getAllBoardRequests);
router.get("/admin/report",          board.getAllReports);  // 관리자 신고 조회

// ───────── 글쓰기 & 수정/삭제 (banCheck) ─────────

// 게시글 작성 (이미지 최대 5장)
router.post(
  "/:board_id/posts",
  banCheck,                         // ⭐ 정지시 403
  upload.array("images", 5),
  board.createPost
);

// 게시글 수정
router.put(
  "/posts/:post_id",
  banCheck,
  upload.array("images", 5),
  board.updatePost
);

// 게시글 삭제
router.delete("/posts/:post_id", banCheck, board.deletePost);

// 댓글 작성·수정·삭제
router.post("/posts/:post_id/comments", banCheck, board.createComment);
router.put("/comments/:comment_id",     banCheck, board.updateComment);
router.delete("/comments/:comment_id",  banCheck, board.deleteComment);

// 게시판 개설 신청 (쓰기라 banCheck 추가)
router.post("/board-requests", banCheck, board.createBoardRequest);

// 게시글·댓글 신고 (쓰기지만 신고는 정지된 사람도 허용한다고 가정 → banCheck 제거가능)
router.post("/report", board.createReport);

module.exports = router;
