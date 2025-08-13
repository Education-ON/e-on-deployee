// controllers/notificationController.js
const { Notification } = require("../models");

// GET /api/notifications?unreadOnly=&page=&pageSize=
exports.list = async (req, res) => {
  const userId = req.user.user_id;
  const { unreadOnly, page = 1, pageSize = 10 } = req.query;

  const where = { user_id: userId };
  if (String(unreadOnly) === "true") where.is_read = false;

  const limit = Number(pageSize);
  const offset = (Number(page) - 1) * limit;

  const { rows, count } = await Notification.findAndCountAll({
    where,
    order: [["created_at", "DESC"]],
    limit,
    offset,
  });

  res.json({ items: rows, total: count });
};

// GET /api/notifications/unread-count
exports.unreadCount = async (req, res) => {
  const userId = req.user.user_id;
  const count = await Notification.count({ where: { user_id: userId, is_read: false } });
  res.json({ count });
};

// POST /api/notifications/mark-read { ids: number[] }
exports.markRead = async (req, res) => {
  const userId = req.user.user_id;
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ message: "ids 필요" });

  await Notification.update({ is_read: true }, { where: { user_id: userId, id: ids } });
  res.json({ success: true });
};

// POST /api/notifications/mark-all-read
exports.markAllRead = async (req, res) => {
  const userId = req.user.user_id;
  await Notification.update({ is_read: true }, { where: { user_id: userId, is_read: false } });
  res.json({ success: true });
};
