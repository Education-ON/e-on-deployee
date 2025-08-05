'use strict';

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    report_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    report_type: {
      type: DataTypes.ENUM('post', 'comment'),
      allowNull: false,
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    reporter_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'Report',
    timestamps: false,
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: 'reporter_id',
      onDelete: 'CASCADE',
    });

    Report.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });

    Report.belongsTo(models.Comment, {
      foreignKey: 'comment_id',
      onDelete: 'CASCADE',
    });
  };

  return Report;
};
