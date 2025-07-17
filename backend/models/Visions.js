'use strict';

module.exports = (sequelize, DataTypes) => {
  const Visions = sequelize.define('Visions', {
    vision_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    vision_detail: {
      type: DataTypes.STRING,
    },
    category_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Visions',
    timestamps: false,
  });

  Visions.associate = (models) => {
    Visions.belongsTo(models.VisionCategory, {
      foreignKey: 'category_code',
      as: 'category',
    });
  };

  return Visions;
};
