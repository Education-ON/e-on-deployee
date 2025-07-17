'use strict';

module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    region_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    region_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'Region',
    timestamps: false,
  });

  Region.associate = (models) => {
    Region.hasMany(models.AverageAcademicSchedule, {
      foreignKey: 'region_id',
      as: 'schedules',
      onDelete: 'CASCADE',
    });
  };

  return Region;
};
