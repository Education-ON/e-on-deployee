'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Board', [
      { board_name: '공지사항', board_type: 'notice', board_audience: 'all', created_at: new Date() },
      { board_name: '자유 게시판', board_type: 'free', board_audience: 'student', created_at: new Date() },
      { board_name: '질문과 답변', board_type: 'qna', board_audience: 'student', created_at: new Date() },
      { board_name: '스터디 모집', board_type: 'study', board_audience: 'student', created_at: new Date() },
      { board_name: '챌린지 후기', board_type: 'review', board_audience: 'all', created_at: new Date() },
      { board_name: '학부모 소통 공간', board_type: 'parent_community', board_audience: 'parent', created_at: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Board', {
      board_name: [
        '공지사항', '자유 게시판', '질문과 답변', '스터디 모집', '챌린지 후기', '학부모 소통 공간'
      ]
    });
  }
};
