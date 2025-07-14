'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParticipatingAttendance', {
      attendance_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      attendance_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      attendance_state: {
        type: Sequelize.ENUM('출석', '결석', '지각'),
        allowNull: false,
      },
      memo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      participating_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'ParticipatingChallenge',
          key: 'participating_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParticipatingAttendance');
  },
};
