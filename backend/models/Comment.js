'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // ✅ 대댓글용 parent_comment_id 추가
    parent_comment_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {
    tableName: 'Comment',
    timestamps: false,
  });

  Comment.associate = (models) => {
    // 기존 관계
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });

    models.User.hasMany(Comment, {
      foreignKey: 'user_id',
    });

    models.Post.hasMany(Comment, {
      foreignKey: 'post_id',
      onDelete: 'CASCADE',
    });

    // ✅ 대댓글 관계 (self-reference)
    Comment.hasMany(Comment, {
      foreignKey: 'parent_comment_id',
      as: 'Replies', // 대댓글 배열로 접근: comment.Replies
      onDelete: 'CASCADE',
    });

    Comment.belongsTo(Comment, {
      foreignKey: 'parent_comment_id',
      as: 'Parent', // 부모 댓글로 접근: comment.Parent
      onDelete: 'CASCADE',
    });
  };

  return Comment;
};
