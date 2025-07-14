'use strict';

module.exports = (sequelize, DataTypes) => {
  const Interests = sequelize.define('Interests', {
    interest_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    interest_detail: {
      type: DataTypes.STRING,
    },
    category_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Interests',
    timestamps: false,
  });

  Interests.associate = (models) => {
    Interests.belongsTo(models.InterestCategory, {
      foreignKey: 'category_code',
      as: 'category',
      onDelete: 'CASCADE',
    });
  };

  return Interests;
};
