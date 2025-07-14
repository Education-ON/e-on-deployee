'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      user_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      pw: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('student', 'parent', 'admin'),
        allowNull: false,
      },
      state_code: {
        type: Sequelize.STRING(100),
        allowNull: true,
        references: {
          model: 'UserState',
          key: 'state_code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      my_school: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email_notification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      agreements: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {},
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
