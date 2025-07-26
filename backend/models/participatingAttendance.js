'use strict';

module.exports = (sequelize, DataTypes) => {
  const ParticipatingAttendance = sequelize.define('ParticipatingAttendance', {
    attendance_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    attendance_state: {
      type: DataTypes.ENUM('출석', '결석', '지각'),
      allowNull: false,
    },
    memo: {
      type: DataTypes.TEXT,
    },
    participating_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'ParticipatingAttendance',
    timestamps: false,
  });

  ParticipatingAttendance.associate = (models) => {
    ParticipatingAttendance.belongsTo(models.ParticipatingChallenge, {
      foreignKey: 'participating_id',
      as: 'participant',
    });
    // models.ParticipatingChallenge.hasMany(ParticipatingAttendance, {
    //   foreignKey: 'participating_id',
    //   as: 'attendances',
    // });
  };

  return ParticipatingAttendance;
};
