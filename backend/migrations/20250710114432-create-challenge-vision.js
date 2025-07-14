'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Challenge_Vision', {
      challenge_vision_id: {
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
      vision_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Visions',
          key: 'vision_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Challenge_Vision');
  },
};
