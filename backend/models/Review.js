'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    rating_stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    text: {
      type: DataTypes.TEXT,
    },
    is_edited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    challenge_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'Review',
    timestamps: false,
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'writer',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Challenge, {
      foreignKey: 'challenge_id',
      onDelete: 'CASCADE',
    });
    models.Challenge.hasMany(Review, {
      foreignKey: 'challenge_id',
      as: 'reviews',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
