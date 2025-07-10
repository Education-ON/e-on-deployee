'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParticipatingChallenge', {
      participating_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      participating_state: {
        type: Sequelize.ENUM('신청', '진행 중', '완료', '취소'),
        allowNull: false,
        defaultValue: '신청',
      },
      challenge_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Challenge',
          key: 'challenge_id',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParticipatingChallenge');
  },
};
