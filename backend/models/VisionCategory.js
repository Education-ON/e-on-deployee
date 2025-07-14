'use strict';

module.exports = (sequelize, DataTypes) => {
  const VisionCategory = sequelize.define('VisionCategory', {
    category_code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'VisionCategory',
    timestamps: false,
  });

  VisionCategory.associate = (models) => {
    // 예: VisionCategory.hasMany(models.Visions, { foreignKey: 'category_code' });
  };

  return VisionCategory;
};
