'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Board', {
      board_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      board_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      board_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      board_audience: {
        type: Sequelize.ENUM('student', 'parent', 'all'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Board');
  }
};
