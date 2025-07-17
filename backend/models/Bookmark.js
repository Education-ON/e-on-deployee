'use strict';

module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    // 필요하다면 추가 필드 정의
    // is_edited: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Bookmarks',
    freezeTableName: true,
    timestamps: false,
  });

  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, { foreignKey: 'user_id' });
    Bookmark.belongsTo(models.Challenge, { foreignKey: 'challenge_id' });

    models.User.belongsToMany(models.Challenge, {
      through: Bookmark,
      foreignKey: 'user_id',
      otherKey: 'challenge_id',
      as: 'bookmarkedChallenges',
    });

    models.Challenge.belongsToMany(models.User, {
      through: Bookmark,
      foreignKey: 'challenge_id',
      otherKey: 'user_id',
      as: 'bookmarkedUsers',
    });
  };

  return Bookmark;
};
