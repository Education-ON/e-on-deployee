'use strict';

module.exports = (sequelize, DataTypes) => {
  const SelectVisions = sequelize.define('SelectVisions', {
    vision_select_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    vision_select_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    vision_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'SelectVisions',
    timestamps: false,
  });

  SelectVisions.associate = (models) => {
    SelectVisions.belongsTo(models.Visions, {
      foreignKey: 'vision_id',
      onDelete: 'CASCADE',
    });
    SelectVisions.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return SelectVisions;
};
