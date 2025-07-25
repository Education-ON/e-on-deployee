"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MySchool", {
            my_school_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            school_code: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            region_code: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "User",
                    key: "user_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("MySchool");
    },
};
