'use strict';

module.exports = (sequelize, DataTypes) => {
  const SelectInterests = sequelize.define('SelectInterests', {
    select_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    select_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    interest_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'SelectInterests',
    timestamps: false,
  });

  SelectInterests.associate = (models) => {
    SelectInterests.belongsTo(models.Interests, {
      foreignKey: 'interest_id',
      onDelete: 'CASCADE',
    });
    SelectInterests.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };

  return SelectInterests;
};
