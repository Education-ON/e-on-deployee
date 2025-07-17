// timeRecommendationController.js
const db = require('../models');
const timeRecommendationService = db.timeRecommendationService;

exports.getRecommendationsByTime = async (req, res) => {
  try {
    const { grade, month, schoolType } = req.query;

    if (!month || !schoolType) {
      return res.status(400).json({ message: 'month와 schoolType은 필수입니다.' });
    }

    const parsedGrade = grade ? parseInt(grade) : undefined;
    const parsedMonth = parseInt(month);

    const results = await timeRecommendationService.getByGradeAndMonth(
      parsedGrade,
      parsedMonth,
      schoolType
    );

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류' });
  }
};
