const {
  Challenge,
  ChallengeDay,
  Attachment,
  Interests,
  Visions,
  User
} = require('../models');
const { notify } = require("../services/notificationService"); // ✨ 추가


// PENDING 상태 챌린지 조회
exports.listPending = async (req, res, next) => {
  try {
    const pendings = await Challenge.findAll({
      where: { status: 'PENDING' },
      order: [['application_deadline', 'ASC']],
    });
    res.json(pendings);
  } catch (err) {
    next(err);
  }
};

// 챌린지 승인 처리
exports.approve = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Challenge.update(
      { status: 'APPROVED' },
      { where: { challenge_id: id } }
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// 챌린지 거절 처리
exports.reject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Challenge.update(
      { status: 'REJECTED' },
      { where: { challenge_id: id } }
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

//챌린지 상세 조회
exports.detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    // status 필터 없이 모든 상태의 챌린지를 조회
    const challenge = await Challenge.findOne({
      where: { challenge_id: id },
      include: [
        { model: User,         as: 'creator',     attributes: ['user_id','name','email'] },
        { model: ChallengeDay, as: 'days',        attributes: ['day_of_week'] },
        { model: Attachment,   as: 'attachments', attributes: ['attachment_id','url','attachment_type'] },
        { model: Interests,    as: 'interests',   through: { attributes: [] }, attributes: ['interest_id','interest_detail'] },
        { model: Visions,      as: 'visions',     through: { attributes: [] }, attributes: ['vision_id','vision_detail'] }
      ]
    });
    if (!challenge) {
      return res.status(404).json({ message: '챌린지를 찾을 수 없습니다.' });
    }

    // 사용자용 필드(북마크, 참여) 없이 가공 응답
    res.json({
      challenge_id: challenge.challenge_id,
      title: challenge.title,
      description: challenge.description,
      age_range: `${challenge.minimum_age} ~ ${challenge.maximum_age}`,
      maximum_people: challenge.maximum_people,
      application_deadline: challenge.application_deadline,
      duration: { start: challenge.start_date, end: challenge.end_date },
      is_recuming: challenge.is_recuming,
      repeat_type: challenge.repeat_type,
      intermediate_participation: challenge.intermediate_participation,
      challenge_state: challenge.challenge_state,
      creator: challenge.creator,
      days: challenge.days.map(d => d.day_of_week),
      attachments: challenge.attachments,
      interests: challenge.interests,
      visions: challenge.visions,
      creator_contact: challenge.creator_contact,
    });
  } catch (err) {
    next(err);
  }
};

// 챌린지 승인 처리
// 승인 시 알림(+이메일)
exports.approve = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ch = await Challenge.findByPk(id, { attributes: ["challenge_id","title","user_id"] });
    await Challenge.update({ status: 'APPROVED' }, { where: { challenge_id: id } });

    // ✨ 알림: 개설자에게 (이메일 허용)
    if (ch) {
      try {
        await notify(ch.user_id, {
          type: "challenge",
          title: "챌린지 개설이 승인되었습니다",
          body: ch.title,
          link: `/challenges/${ch.challenge_id}`,
          eventKey: "challenge_creation_approved",
        });
      } catch (e) {
        console.warn("[notify] challenge approve:", e.message);
      }
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

