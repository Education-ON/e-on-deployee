'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SelectInterests', [
      {
        interest_id: 1, // 철학
        user_id: 1,
        select_date: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SelectInterests', {
      interest_id: 1,
      user_id: 1,
    }, {});
  }
};
