// services/notificationService.js
const db = require("../models");
const transporter = require("../config/mail"); // 너가 쓰는 nodemailer transporter
const User = db.User;
const Notification = db.Notification; // 모델 없으면 undefined일 수 있음

let io = null;
exports.init = (ioInstance) => { io = ioInstance; };

// 어떤 이벤트에 이메일을 보낼지(옵트인)
const EMAIL_EVENT_ALLOW = new Set([
  "challenge_creation_approved", // 챌린지 개설 승인
  "board_creation_approved",     // 게시판 개설 승인
  // "challenge_participation_approved", // 참여 승인에 이메일도 원하면 주석 해제
]);

/**
 * notify(userId, {
 *   type: "system"|"challenge"|"post"|"comment"|"board",
 *   title: string,
 *   body?: string,
 *   link?: string,
 *   eventKey?: string, // EMAIL_EVENT_ALLOW에 있으면, 그리고 사용자 email_notification=true면 메일 발송
 * })
 */
exports.notify = async (userId, payload) => {
  const { type = "system", title, body, link, eventKey } = payload;
  console.log("[notify] try → user:", userId, "title:", title);

  // 1) DB 저장(인앱 목록용)
  let noti = null;
  if (Notification) {
    try {
      console.log("[notify] try → user:", userId, "title:", title);
      noti = await Notification.create({
        user_id: userId, type, title, body, link, is_read: false,
      });
      console.log("[notify] saved id:", noti.id);
    } catch (e) {
      console.warn("[notify] DB 저장 스킵:", e.message);
    }
  }

  // 2) 실시간 푸시(있으면)
  if (io) {
    try {
      io.to(`user:${userId}`).emit("notification:new", {
        id: noti?.id,
        type, title, body, link,
        createdAt: noti?.createdAt || new Date().toISOString(),
        is_read: false,
      });
    } catch (e) {
      console.warn("[notify] socket emit 스킵:", e.message);
    }
  }

  // 3) 이메일(옵션)
  if (eventKey && EMAIL_EVENT_ALLOW.has(eventKey)) {
    try {
      const u = await User.findByPk(userId, { attributes: ["email", "email_notification", "name"] });
      if (u?.email && u.email_notification) {
        await transporter.sendMail({
          to: u.email,
          subject: `[E-ON] ${title}`,
          text: body ? `${body}\n\n바로가기: ${link || "-"}` : `바로가기: ${link || "-"}`,
        });
      }
    } catch (e) {
      console.warn("[notify] email 스킵:", e.message);
    }
  }

  return noti;
};
