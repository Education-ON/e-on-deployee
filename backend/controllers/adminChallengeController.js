const { Challenge } = require('../models');

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
