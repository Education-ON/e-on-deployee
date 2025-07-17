'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BoardRequest', {
      request_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      requested_board_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      requested_board_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      board_audience: {
        type: Sequelize.ENUM('student', 'parent', 'all'),
        allowNull: false,
      },
      request_reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      request_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      request_status: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BoardRequest');
  }
};
