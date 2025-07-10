'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attachment', {
      attachment_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      attachment_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      attachment_type: {
        type: Sequelize.ENUM('이미지', '문서', '영상', '기타'),
        allowNull: false,
      },
      challenge_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Challenge',      // FK 연결
          key: 'challenge_id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attachment');
  },
};
