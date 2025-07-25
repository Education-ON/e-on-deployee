'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VisionCategory', {
      category_code: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VisionCategory');
  },
};
