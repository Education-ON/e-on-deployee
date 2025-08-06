const recommendService = require('../services/recommendService');

exports.getRecommendedChallenges = async (req, res) => {
  try {
    console.log('✅ req.user:', req.user);

    // Sequelize 모델인 경우 dataValues.user_id 에서 꺼내야 함
    const userId = req.user?.dataValues?.user_id;

    if (!userId) {
      console.warn('❌ userId를 찾을 수 없습니다.');
      return res.status(400).json({ message: 'userId를 찾을 수 없습니다.' });
    }

    const recommended = await recommendService.getRecommendedChallenges(userId);
    res.json(recommended);
  } catch (err) {
    console.error('🔥 추천 실패:', err);
    res.status(500).json({ message: '추천에 실패했습니다.' });
  }
};