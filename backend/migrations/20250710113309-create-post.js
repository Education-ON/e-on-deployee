'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Post', {
      post_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      board_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Board',
          key: 'board_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Post');
  },
};
