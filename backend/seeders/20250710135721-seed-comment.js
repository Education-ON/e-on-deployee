'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comment', [
      // 게시글 1 - 일반 댓글
      { comment_id: 1, post_id: 1, user_id: 1, content: '점검 공지 감사합니다!', created_at: new Date('2025-06-02T05:00:00'), parent_comment_id: null },
      { comment_id: 2, post_id: 1, user_id: 2, content: '덕분에 대비할 수 있었어요.', created_at: new Date('2025-06-02T06:00:00'), parent_comment_id: 1 }, // 대댓글

      // 게시글 2 - 일반 댓글
      { comment_id: 3, post_id: 2, user_id: 3, content: '김치찌개 추천요!', created_at: new Date('2025-06-02T12:00:00'), parent_comment_id: null },
      { comment_id: 4, post_id: 2, user_id: 4, content: '저는 돈까스 먹을래요~', created_at: new Date('2025-06-02T12:05:00'), parent_comment_id: 3 }, // 대댓글

      // 게시글 4
      { comment_id: 5, post_id: 4, user_id: 6, content: '외래키 문제일 수 있어요.', created_at: new Date('2025-06-02T13:00:00'), parent_comment_id: null },

      // 게시글 5
      { comment_id: 6, post_id: 5, user_id: 2, content: 'map은 배열 돌리는 함수예요!', created_at: new Date('2025-06-02T14:00:00'), parent_comment_id: null },

      // 게시글 6
      { comment_id: 7, post_id: 6, user_id: 5, content: '참여하고 싶어요!', created_at: new Date('2025-06-02T15:00:00'), parent_comment_id: null },

      // 게시글 8
      { comment_id: 8, post_id: 8, user_id: 3, content: '진짜 공감합니다!', created_at: new Date('2025-06-02T17:00:00'), parent_comment_id: null },

      // 게시글 10
      { comment_id: 9, post_id: 10, user_id: 2, content: '저희 아이는 공부 전에 타이머 설정해줘요!', created_at: new Date('2025-06-02T18:00:00'), parent_comment_id: null },
      { comment_id: 10, post_id: 10, user_id: 4, content: '같은 고민이에요. 저도 팁 궁금합니다.', created_at: new Date('2025-06-02T18:10:00'), parent_comment_id: 9 }, // 대댓글

      // 게시글 11
      { comment_id: 11, post_id: 11, user_id: 6, content: '좋은 자료 감사합니다!', created_at: new Date('2025-06-02T19:00:00'), parent_comment_id: null },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comment', {
      content: [
        '점검 공지 감사합니다!',
        '덕분에 대비할 수 있었어요.',
        '김치찌개 추천요!',
        '저는 돈까스 먹을래요~',
        '외래키 문제일 수 있어요.',
        'map은 배열 돌리는 함수예요!',
        '참여하고 싶어요!',
        '진짜 공감합니다!',
        '저희 아이는 공부 전에 타이머 설정해줘요!',
        '같은 고민이에요. 저도 팁 궁금합니다.',
        '좋은 자료 감사합니다!'
      ]
    });
  }
};
