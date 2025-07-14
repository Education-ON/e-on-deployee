'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Interests', [
      // A01 인문/사회
      { interest_detail: '철학', category_code: 'A01' },
      { interest_detail: '심리학', category_code: 'A01' },
      { interest_detail: '역사', category_code: 'A01' },
      { interest_detail: '사회학', category_code: 'A01' },
      { interest_detail: '언어학', category_code: 'A01' },
      { interest_detail: '국제관계', category_code: 'A01' },

      // A02 자연과학
      { interest_detail: '생물학', category_code: 'A02' },
      { interest_detail: '화학', category_code: 'A02' },
      { interest_detail: '물리학', category_code: 'A02' },
      { interest_detail: '지구과학', category_code: 'A02' },
      { interest_detail: '천문학', category_code: 'A02' },

      // A03 예술/디자인
      { interest_detail: '시각디자인', category_code: 'A03' },
      { interest_detail: '일러스트레이션', category_code: 'A03' },
      { interest_detail: 'UX/UI 디자인', category_code: 'A03' },
      { interest_detail: '산업디자인', category_code: 'A03' },
      { interest_detail: '회화', category_code: 'A03' },

      // A04 음악/연극
      { interest_detail: '피아노', category_code: 'A04' },
      { interest_detail: '보컬', category_code: 'A04' },
      { interest_detail: '연기', category_code: 'A04' },
      { interest_detail: '작곡', category_code: 'A04' },
      { interest_detail: '바이올린', category_code: 'A04' },

      // A05 영상/미디어
      { interest_detail: '영상편집', category_code: 'A05' },
      { interest_detail: '유튜브 제작', category_code: 'A05' },
      { interest_detail: '촬영기법', category_code: 'A05' },
      { interest_detail: '광고 기획', category_code: 'A05' },

      // A06 IT/코딩
      { interest_detail: '웹 개발', category_code: 'A06' },
      { interest_detail: '앱 개발', category_code: 'A06' },
      { interest_detail: '게임 개발', category_code: 'A06' },
      { interest_detail: '데이터 분석', category_code: 'A06' },
      { interest_detail: 'AI 프로그래밍', category_code: 'A06' },

      // A07 게임
      { interest_detail: '게임기획', category_code: 'A07' },
      { interest_detail: '게임아트', category_code: 'A07' },
      { interest_detail: '게임프로그래밍', category_code: 'A07' },
      { interest_detail: 'e스포츠', category_code: 'A07' },

      // A08 스포츠
      { interest_detail: '축구', category_code: 'A08' },
      { interest_detail: '농구', category_code: 'A08' },
      { interest_detail: '수영', category_code: 'A08' },
      { interest_detail: '테니스', category_code: 'A08' },
      { interest_detail: '배드민턴', category_code: 'A08' },
      { interest_detail: '육상', category_code: 'A08' },

      // A09 봉사/리더십
      { interest_detail: '자원봉사', category_code: 'A09' },
      { interest_detail: '청소년 리더십 캠프', category_code: 'A09' },
      { interest_detail: '또래상담', category_code: 'A09' },
      { interest_detail: '환경보호활동', category_code: 'A09' },

      // A10 창업
      { interest_detail: '스타트업 기획', category_code: 'A10' },
      { interest_detail: '비즈니스 모델링', category_code: 'A10' },
      { interest_detail: '창업경진대회 준비', category_code: 'A10' },
      { interest_detail: '마케팅 전략', category_code: 'A10' },

      // A11 요리/제과
      { interest_detail: '제과제빵', category_code: 'A11' },
      { interest_detail: '한식 조리', category_code: 'A11' },
      { interest_detail: '퓨전요리', category_code: 'A11' },
      { interest_detail: '바리스타', category_code: 'A11' },

      // A12 뷰티/패션
      { interest_detail: '메이크업', category_code: 'A12' },
      { interest_detail: '헤어디자인', category_code: 'A12' },
      { interest_detail: '패션 스타일링', category_code: 'A12' },
      { interest_detail: '네일아트', category_code: 'A12' },

      // A99 기타
      { interest_detail: '직접 입력', category_code: 'A99' },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Interests', {
      interest_detail: [
        '철학', '심리학', '역사', '사회학', '언어학', '국제관계',
        '생물학', '화학', '물리학', '지구과학', '천문학',
        '시각디자인', '일러스트레이션', 'UX/UI 디자인', '산업디자인', '회화',
        '피아노', '보컬', '연기', '작곡', '바이올린',
        '영상편집', '유튜브 제작', '촬영기법', '광고 기획',
        '웹 개발', '앱 개발', '게임 개발', '데이터 분석', 'AI 프로그래밍',
        '게임기획', '게임아트', '게임프로그래밍', 'e스포츠',
        '축구', '농구', '수영', '테니스', '배드민턴', '육상',
        '자원봉사', '청소년 리더십 캠프', '또래상담', '환경보호활동',
        '스타트업 기획', '비즈니스 모델링', '창업경진대회 준비', '마케팅 전략',
        '제과제빵', '한식 조리', '퓨전요리', '바리스타',
        '메이크업', '헤어디자인', '패션 스타일링', '네일아트',
        '직접 입력'
      ]
    });
  }
};
