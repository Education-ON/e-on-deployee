'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserState', {
      state_code: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      state_description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserState');
  },
};
