'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Post', [
      { board_id: 1, user_id: 6, title: '서비스 점검 안내', content: '2025년 6월 1일 오전 2시부터 4시까지 서버 점검이 예정되어 있습니다.', created_at: new Date() },
      { board_id: 2, user_id: 1, title: '오늘 점심 뭐 먹을까요?', content: '배가 고픈데 추천 좀 해주세요!', created_at: new Date() },
      { board_id: 2, user_id: 2, title: '요즘 날씨 너무 덥네요', content: '냉방병 조심하세요~', created_at: new Date() },
      { board_id: 3, user_id: 3, title: 'MySQL 에러 질문이요', content: 'ERROR 1452: Cannot add or update a child row 라고 뜨는데 뭐가 문제일까요?', created_at: new Date() },
      { board_id: 3, user_id: 1, title: '자바스크립트에서 map 함수가 뭐에요?', content: '설명과 예제 알려주시면 감사하겠습니다!', created_at: new Date() },
      { board_id: 4, user_id: 4, title: '파이썬 스터디 모집합니다', content: '매주 토요일 오후 3시에 진행 예정. 관심 있으신 분 댓글 주세요!', created_at: new Date() },
      { board_id: 4, user_id: 5, title: '알고리즘 같이 공부하실 분!', content: '초보자도 환영합니다. 꾸준히 하실 분이면 좋아요!', created_at: new Date() },
      { board_id: 5, user_id: 2, title: '챌린지 정말 유익했어요!', content: '운동 습관 잡기에 최고였습니다.', created_at: new Date() },
      { board_id: 5, user_id: 3, title: '리더분께 감사드립니다', content: '열정적으로 챌린지를 이끌어주셔서 감사합니다!', created_at: new Date() },
      { board_id: 6, user_id: 6, title: '자녀 학습 습관 어떻게 잡으세요?', content: '요즘 아이가 집중을 잘 못해서 고민이에요. 팁 있으신가요?', created_at: new Date() },
      { board_id: 6, user_id: 5, title: '좋은 교육 자료 공유합니다', content: '수학 개념 잡기 좋은 유튜브 링크입니다. 함께 나눠요!', created_at: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Post', {
      title: [
        '서비스 점검 안내',
        '오늘 점심 뭐 먹을까요?',
        '요즘 날씨 너무 덥네요',
        'MySQL 에러 질문이요',
        '자바스크립트에서 map 함수가 뭐에요?',
        '파이썬 스터디 모집합니다',
        '알고리즘 같이 공부하실 분!',
        '챌린지 정말 유익했어요!',
        '리더분께 감사드립니다',
        '자녀 학습 습관 어떻게 잡으세요?',
        '좋은 교육 자료 공유합니다',
      ]
    });
  }
};
