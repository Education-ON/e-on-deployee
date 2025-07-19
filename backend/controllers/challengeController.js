// controllers/challengeController.js
const { Op } = require('sequelize');
const db = require('../models');
const {
  Challenge,
  ChallengeDay,
  Attachment,
  ChallengeInterest,
  ChallengeVision,
  ParticipatingChallenge,
  User,
  Bookmark,
  Review,
  Interests,
  Visions
} = db;

/** ---------------- 챌린지 개설 ---------------- **/
exports.create = async (req, res, next) => {
  const body = req.body.meta ? JSON.parse(req.body.meta) : req.body;
  const filesObj = req.files ?? {};
  const photosArr = filesObj.photos || [];
  const consentsArr = filesObj.consents || [];

  try {
    const {
      title,
      description,
      minimum_age,
      maximum_age,
      maximum_people,
      application_deadline,
      start_date,
      end_date,
      is_recuming = false,
      repeat_type = null,
      intermediate_participation = false,
      creator_contact,
      user_id,
      days = [],
      interestIds = [],
      visionIds = []
    } = body;

    if (!title || !description || !creator_contact || !user_id) {
      return res.status(400).json({ error: '필수 필드 누락' });
    }

    const challenge = await Challenge.sequelize.transaction(async (t) => {
      const ch = await Challenge.create({
        title,
        description,
        minimum_age,
        maximum_age,
        maximum_people,
        application_deadline,
        start_date,
        end_date,
        is_recuming,
        repeat_type,
        intermediate_participation,
        creator_contact,
        user_id,
        // PENDING 상태로 생성 (모델 기본값 사용 가능)
        status: 'PENDING'
      }, { transaction: t });

      // 요일 삽입
      if (is_recuming && days.length) {
        const bulkDays = days.map(d => ({ challenge_id: ch.challenge_id, day_of_week: d }));
        await ChallengeDay.bulkCreate(bulkDays, { transaction: t });
      }

      // 관심/비전 매핑
      if (interestIds.length) await ch.addInterests(interestIds, { transaction: t });
      if (visionIds.length)   await ch.addVisions(visionIds,   { transaction: t });

      // 첨부파일
      const attachRows = [];
      photosArr.forEach(f => attachRows.push({
        challenge_id: ch.challenge_id,
        attachment_name: f.originalname,
        url: `/uploads/${f.filename}`,
        attachment_type: '이미지'
      }));
      consentsArr.forEach(f => attachRows.push({
        challenge_id: ch.challenge_id,
        attachment_name: f.originalname,
        url: `/uploads/${f.filename}`,
        attachment_type: '문서'
      }));
      if (attachRows.length) await Attachment.bulkCreate(attachRows, { transaction: t });

      return ch;
    });

    res.status(201).json({
      message: '챌린지 개설이 신청되었습니다. 관리자 승인 후 공개됩니다.',
      challenge_id: challenge.challenge_id
    });
  } catch (err) {
    console.error('▶ SQL Error:', err);
    next(err);
  }
};

/** ---------------- 챌린지 목록 조회 ---------------- **/
exports.list = async (req, res, next) => {
  try {
    const {
      q: keyword = '',
      state,
      date: dateStr,
      minAge,
      maxAge,
      page = 1,
      limit = 20,
      interestId,
      visionId,
      user_id: userId
    } = req.query;
    const offset = (page - 1) * limit;

    const where = { status: 'APPROVED' };
    if (keyword) where[Op.or] = [
      { challenge_title: { [Op.like]: `%${keyword}%` } },
      { challenge_description: { [Op.like]: `%${keyword}%` } }
    ];
    if (state) where.challenge_state = state;
    if (dateStr) {
      const target = new Date(dateStr);
      where.start_date = { [Op.lte]: target };
      where.end_date   = { [Op.gte]: target };
    }
    if (minAge) where.minimum_age = { [Op.gte]: Number(minAge) };
    if (maxAge) where.maximum_age = { [Op.lte]: Number(maxAge) };

    const include = [
      { model: ChallengeDay, as: 'days', attributes: ['day_of_week'] },
      { model: Attachment, as: 'attachments', attributes: ['url'] },
      // 관심사
      interestId ? {
        model: Interests, as: 'interests', required: true,
        through: { where: { interest_id: Number(interestId) }, attributes: [] },
        attributes: ['interest_id','interest_detail']
      } : {
        model: Interests, as: 'interests', through: { attributes: [] }, attributes: ['interest_id','interest_detail']
      },
      // 비전
      visionId ? {
        model: Visions, as: 'visions', required: true,
        through: { where: { vision_id: Number(visionId) }, attributes: [] },
        attributes: ['vision_id','vision_detail']
      } : {
        model: Visions, as: 'visions', through: { attributes: [] }, attributes: ['vision_id','vision_detail']
      }
    ];

    const { count, rows } = await Challenge.findAndCountAll({
      where, include, distinct: true,
      limit: Number(limit), offset: Number(offset),
      order: [['challenge_id','DESC']]
    });

    // 참여 정보 매핑
    let map = {};
    if (userId) {
      const parts = await ParticipatingChallenge.findAll({
        where: { challenge_id: rows.map(c=>c.challenge_id), user_id: Number(userId) }
      });
      map = parts.reduce((a,p) => (a[p.challenge_id]=p, a), {});
    }
    rows.forEach(r => r.setDataValue('my_participation', map[r.challenge_id] || null));

    res.json({ totalItems: count, challenges: rows, totalPages: Math.ceil(count/limit), currentPage: Number(page) });
  } catch (err) {
    next(err);
  }
};

/** ---------------- 챌린지 상세 조회 ---------------- **/
exports.detail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.query.user_id;

    const includeArr = [
      { model: User, as: 'creator', attributes: ['user_id','name','email'] },
      { model: ChallengeDay, as: 'days', attributes: ['day_of_week'] },
      { model: Attachment, as: 'attachments', attributes: ['attachment_id','url','attachment_type'] },
      { model: Interests, as: 'interests', through: { attributes: [] }, attributes: ['interest_id','interest_detail'] },
      { model: Visions, as: 'visions', through: { attributes: [] }, attributes: ['vision_id','vision_detail'] }
    ];

    const challenge = await Challenge.findOne({ where: { challenge_id: id, status: 'APPROVED' }, include: includeArr });
    if (!challenge) return res.status(404).json({ error: '존재하지 않는 챌린지' });

    const is_bookmarked = userId ? !!(await Bookmark.findOne({ where: { challenge_id: id, user_id: Number(userId) } })) : false;
    let myParticipation = null;
    if (userId && challenge.participants) {
      const pc = challenge.participants[0];
      myParticipation = pc ? { participating_id: pc.participating_id, participating_state: pc.participating_state } : null;
    }

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
      is_bookmarked,
      my_participation: myParticipation
    });
  } catch (err) {
    next(err);
  }
};

/** ---------------- 챌린지 수정 ---------------- **/
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const userId = body.user_id;

    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ error: '챌린지 없음' });
    if (challenge.user_id !== userId) return res.status(403).json({ error: '권한 없음' });

    const updatable = ['title','description','minimum_age','maximum_age','maximum_people','application_deadline','start_date','end_date','is_recuming','repeat_type','intermediate_participation','creator_contact'];
    updatable.forEach(f => { if (body[f] !== undefined) challenge[f] = body[f]; });

    // challenge_state 변경 허용
    if (body.challenge_state) {
      const allowed = ['ACTIVE','CLOSED','CANCELLED'];
      if (!allowed.includes(body.challenge_state)) return res.status(400).json({ error: '잘못된 상태 값' });
      challenge.challenge_state = body.challenge_state;
    }

    await challenge.save();

    // 요일 수정
    if (body.days) {
      await ChallengeDay.destroy({ where: { challenge_id: id } });
      if (body.is_recuming && body.days.length) {
        await ChallengeDay.bulkCreate(body.days.map(d => ({ challenge_id: id, day_of_week: d }))); }
    }
    // 관심/비전 수정
    if (body.interestIds) await challenge.setInterests(body.interestIds);
    if (body.visionIds) await challenge.setVisions(body.visionIds);

    res.json({ message: '수정 완료' });
  } catch (err) {
    next(err);
  }
};

/** ---------------- 챌린지 삭제 ---------------- **/
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const loginUser = req.user;
    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ error: '챌린지 없음' });
    if (challenge.user_id !== loginUser.user_id) return res.status(403).json({ error: '삭제 권한 없음' });
    // 관계 데이터 삭제
    await Promise.all([
      ChallengeDay.destroy({ where: { challenge_id: id } }),
      ChallengeInterest.destroy({ where: { challenge_id: id } }),
      ChallengeVision.destroy({ where: { challenge_id: id } }),
      Review.destroy({ where: { challenge_id: id } }),
      ParticipatingChallenge.destroy({ where: { challenge_id: id } })
    ]);
    await Challenge.destroy({ where: { challenge_id: id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

/** ---------------- 챌린지 상태 변경 ---------------- **/
exports.changeState = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const allowed = ['ACTIVE','CLOSED','CANCELLED'];
    if (!allowed.includes(state)) return res.status(400).json({ error: '잘못된 상태 값' });

    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ error: '챌린지 없음' });

    challenge.challenge_state = state;
    await challenge.save();
    res.json({ challenge_id: id, challenge_state: state });
  } catch (err) {
    next(err);
  }
};
