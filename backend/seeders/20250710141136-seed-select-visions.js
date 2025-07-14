'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SelectVisions', [
      {
        vision_id: 6, // 초등교사
        user_id: 1,
        vision_select_date: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SelectVisions', {
      vision_id: 6,
      user_id: 1,
    }, {});
  }
};
