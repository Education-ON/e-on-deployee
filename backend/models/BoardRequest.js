'use strict';

module.exports = (sequelize, DataTypes) => {
  const BoardRequest = sequelize.define('BoardRequest', {
    request_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    requested_board_name: {
      type: DataTypes.STRING(255),
    },
    requested_board_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    board_audience: {
      type: DataTypes.ENUM('student', 'parent', 'all'),
      allowNull: false,
    },
    request_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    request_date: {
      type: DataTypes.DATE,
    },
    request_status: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'BoardRequest',
    timestamps: false,
  });

  BoardRequest.associate = (models) => {
    BoardRequest.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    models.User.hasMany(BoardRequest, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return BoardRequest;
};
