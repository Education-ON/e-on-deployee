'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Region', {
      region_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      region_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Region');
  },
};
