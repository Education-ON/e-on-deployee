'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Challenge', {
      challenge_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      creator_contact: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      challenge_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      challenge_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      minimum_age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximum_age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maximum_people: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      application_deadline: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_recuming: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      repeat_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      intermediate_participation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      challenge_state: {
        type: Sequelize.ENUM('ACTIVE', 'CLOSED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Challenge');
  }
};
