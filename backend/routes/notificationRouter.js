// routes/notificationRouter.js
const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const c = require("../controllers/notificationController");

router.get("/", isLoggedIn, c.list);
router.get("/unread-count", isLoggedIn, c.unreadCount);
router.post("/mark-read", isLoggedIn, c.markRead);
router.post("/mark-all-read", isLoggedIn, c.markAllRead);

// 확인용
router.post("/_debug/push", isLoggedIn, async (req, res) => {
  const { notify } = require("../services/notificationService");
  await notify(req.user.user_id, {
    type: "system",
    title: "디버그 알림",
    body: "서버에서 강제로 넣은 알림입니다.",
    link: "/",
  });
  res.json({ ok: true });
});


module.exports = router;
