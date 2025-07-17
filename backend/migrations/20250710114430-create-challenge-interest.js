'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Challenge_Interest', {
      challenge_interest_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      interest_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Interests',
          key: 'interest_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Challenge_Interest');
  },
};
