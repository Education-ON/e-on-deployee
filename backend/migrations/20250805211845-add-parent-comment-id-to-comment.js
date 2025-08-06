'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comment', 'parent_comment_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'Comment',
        key: 'comment_id',
      },
      onDelete: 'CASCADE', // 부모 댓글 삭제 시 대댓글도 삭제
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comment', 'parent_comment_id');
  },
};
