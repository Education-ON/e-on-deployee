'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Report', {
      report_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      report_type: {
        type: Sequelize.ENUM('post', 'comment'),
        allowNull: false,
      },
      post_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'Post',
          key: 'post_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comment_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'Comment',
          key: 'comment_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      reporter_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Report');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Report_report_type";'); // ENUM 정리
  }
};
