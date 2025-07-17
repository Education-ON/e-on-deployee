'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Interests', {
      interest_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      interest_detail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'InterestCategory',
          key: 'category_code',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Interests');
  },
};
