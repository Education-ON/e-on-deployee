'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) time_based 대시보드 생성 (초등용)
    await queryInterface.bulkInsert('RecommendationDashboard', [
      { recommendation_type: 'time_based' }
    ], {});

    // 방금 insert된 dashboard_id 가져오기
    const [elementaryDashboard] = await queryInterface.sequelize.query(
      `SELECT dashboard_id FROM RecommendationDashboard WHERE recommendation_type = 'time_based' ORDER BY dashboard_id ASC LIMIT 1;`
    );

    const elementaryDashboardId = elementaryDashboard[0].dashboard_id;

    // 2) elementary RecommendationItem 에 dashboard_id 연결
    await queryInterface.sequelize.query(
      `UPDATE RecommendationItem SET dashboard_id = ${elementaryDashboardId} WHERE school_type = 'elementary';`
    );

    // 3) 중등용 time_based 대시보드 생성
    await queryInterface.bulkInsert('RecommendationDashboard', [
      { recommendation_type: 'time_based' }
    ], {});

    // 방금 insert된 dashboard_id 가져오기
    const [middleDashboard] = await queryInterface.sequelize.query(
      `SELECT dashboard_id FROM RecommendationDashboard WHERE recommendation_type = 'time_based' ORDER BY dashboard_id DESC LIMIT 1;`
    );

    const middleDashboardId = middleDashboard[0].dashboard_id;

    // 4) middle RecommendationItem 에 dashboard_id 연결
    await queryInterface.sequelize.query(
      `UPDATE RecommendationItem SET dashboard_id = ${middleDashboardId} WHERE school_type = 'middle';`
    );
  },

  async down(queryInterface, Sequelize) {
    // dashboard_id 해제
    await queryInterface.sequelize.query(
      `UPDATE RecommendationItem SET dashboard_id = NULL WHERE school_type IN ('elementary', 'middle');`
    );

    // 생성된 RecommendationDashboard 삭제
    await queryInterface.bulkDelete('RecommendationDashboard', {
      recommendation_type: 'time_based'
    }, {});
  }
};
