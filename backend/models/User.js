"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            user_id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 8 },
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: "pw",
            },
            type: {
                type: DataTypes.ENUM("student", "parent", "admin"),
                allowNull: false,
                validate: {
                    isIn: [["student", "parent", "admin"]],
                },
            },
            state_code: {
                type: DataTypes.STRING(100),
            },
            // my_school: {
            //     type: DataTypes.BIGINT,
            // },
            email_notification: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            agreements: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: {},
            },
        },
        {
            tableName: "User",
            timestamps: false,
            defaultScope: {
                attributes: { exclude: ["password"] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ["password"] },
                },
            },
            hooks: {
                beforeSave: async (user) => {
                    if (user.changed("password") && user.password) {
                        user.password = await bcrypt.hash(user.password, 12);
                    }
                },
            },
        }
    );

    // 관계 설정
    User.associate = (models) => {
        User.belongsTo(models.UserState, {
            foreignKey: "state_code",
            targetKey: "state_code",
        });

        User.hasOne(models.MySchool, {
            foreignKey: "user_id",
            as: "mySchool",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });

        User.hasMany(models.BoardRequest, {
            foreignKey: "user_id",
        });
    };

    return User;
};
