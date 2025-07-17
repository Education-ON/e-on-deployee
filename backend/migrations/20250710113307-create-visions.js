'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visions', {
      vision_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vision_detail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'VisionCategory',
          key: 'category_code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visions');
  },
};
