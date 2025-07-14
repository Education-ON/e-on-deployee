'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AverageAcademicSchedule', {
      averageSchedule_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      school_type: {
        type: Sequelize.ENUM('elementary', 'middle'),
        allowNull: false,
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      average_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      one_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      tw_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      three_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      fr_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      fiv_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      six_grade_event_yn: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      year: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      region_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Region',
          key: 'region_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AverageAcademicSchedule');
  }
};
