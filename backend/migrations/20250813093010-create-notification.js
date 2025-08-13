"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) 테이블 생성
    await queryInterface.createTable("Notification", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(32),   // "comment" | "challenge" | "board" | "system"
        allowNull: false,
        defaultValue: "system",
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // 2) 인덱스 (조회 성능)
    await queryInterface.addIndex("Notification", ["user_id"]);
    await queryInterface.addIndex("Notification", ["user_id", "is_read"]);
    await queryInterface.addIndex("Notification", ["created_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Notification");
  },
};
