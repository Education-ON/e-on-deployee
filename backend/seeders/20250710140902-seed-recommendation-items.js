'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecommendationItem', [
      // ✅ 초등 1월
      { title: '자기만의 책 만들기', description: '나를 주제로 한 그림책 또는 포토북 작성', school_type: 'elementary', month: 1 },
      { title: '1일 1책 프로젝트', description: '다양한 주제의 그림책을 읽고 짧은 리뷰 남기기', school_type: 'elementary', month: 1 },
      { title: '명상 놀이', description: '감정카드를 활용해 오늘 감정 돌아보기', school_type: 'elementary', month: 1 },

      // ✅ 초등 2월
      { title: '학용품 DIY 정리함 만들기', description: '창의력 발달 및 자립성 향상', school_type: 'elementary', month: 2 },
      { title: '동네 도서관 체험하기', description: '나만의 조용한 공간 발견하기', school_type: 'elementary', month: 2 },
      { title: '‘나를 소개하는 영상’ 만들기', description: '자기 표현력 향상', school_type: 'elementary', month: 2 },

      // ✅ 초등 3월
      { title: '나만의 규칙 만들기', description: '하루 일과표 또는 내가 지키고 싶은 약속 카드 작성', school_type: 'elementary', month: 3 },
      { title: '1일 1감정 그림일기', description: '새로운 환경에서 느끼는 감정 시각화하기', school_type: 'elementary', month: 3 },
      { title: '교통안전 퀴즈 & 체험놀이', description: '실생활 안전 감수성 높이기', school_type: 'elementary', month: 3 },

      // ✅ 초등 4월
      { title: '도움 주기 챌린지', description: '하루에 한 번 가족이나 친구를 도와주기', school_type: 'elementary', month: 4 },
      { title: '장애이해 카드 만들기', description: '다른 친구들과 다름을 이해하는 교육', school_type: 'elementary', month: 4 },
      { title: '미니 실험노트', description: '집에서도 할 수 있는 간단한 과학 놀이', school_type: 'elementary', month: 4 },

      // ✅ 초등 5월
      { title: '우리 동네 문화 탐방', description: '지역 박물관이나 역사 명소 방문', school_type: 'elementary', month: 5 },
      { title: '운동 루틴 만들기', description: '매일 10분 운동 루틴으로 자기관리 훈련', school_type: 'elementary', month: 5 },
      { title: '세계 친구 인터뷰 놀이', description: '다른 나라 문화를 알아보고 역할극 해보기', school_type: 'elementary', month: 5 },

      // ✅ 초등 6월
      { title: '생태 관찰 일지 쓰기', description: '매일 한 가지 자연물 기록하기', school_type: 'elementary', month: 6 },
      { title: '진로 인터뷰 놀이', description: '‘미래의 나’ 인터뷰 스크립트 써보기', school_type: 'elementary', month: 6 },
      { title: '사이버 예절 보드게임 만들기', description: '디지털 사용습관 반영', school_type: 'elementary', month: 6 },

      // ✅ 초등 7월
      { title: '작가 따라 글쓰기', description: '좋아하는 그림책 작가 스타일 따라 써보기', school_type: 'elementary', month: 7 },
      { title: '진로 퀴즈 놀이', description: '다양한 직업을 주제로 카드 게임 만들기', school_type: 'elementary', month: 7 },
      { title: '여름생활계획표 만들기', description: '방학 목표 정하기', school_type: 'elementary', month: 7 },

      // ✅ 초등 8월
      { title: '광복절 역사 영상 만들기', description: '그림 + 목소리로 짧은 설명 영상 제작', school_type: 'elementary', month: 8 },
      { title: '여름방학 추억 엽서 쓰기', description: '한 달 간 기억에 남는 일 정리', school_type: 'elementary', month: 8 },
      { title: '자연 속 1인 방송 놀이', description: '자연 속에서 주제를 정해 ‘방송놀이’ 하기', school_type: 'elementary', month: 8 },

      // ✅ 초등 9월
      { title: '‘나의 하루’ 그래프 그리기', description: '하루 시간 사용 시각화해보기', school_type: 'elementary', month: 9 },
      { title: '좋아하는 것 3가지 발표하기', description: '발표력 키우는 활동', school_type: 'elementary', month: 9 },
      { title: '도서 리뷰 유튜버 따라 하기', description: '책 한 권 요약 및 감상 말로 표현', school_type: 'elementary', month: 9 },

      // ✅ 초등 10월
      { title: '추석 문화 알기 놀이', description: '송편 만들기 체험, 가족 인터뷰 등', school_type: 'elementary', month: 10 },
      { title: '한글날 시화 만들기', description: '내가 좋아하는 말로 시 쓰고 꾸미기', school_type: 'elementary', month: 10 },
      { title: '가을 그림일기', description: '자연 관찰 + 감정 기록', school_type: 'elementary', month: 10 },

      // ✅ 초등 11월
      { title: '올해의 나 돌아보기', description: '사진 + 말풍선 + 나만의 상장 만들기', school_type: 'elementary', month: 11 },
      { title: '어린이 뉴스 발표회', description: '관심 있는 뉴스 요약해서 발표 놀이', school_type: 'elementary', month: 11 },
      { title: '가계부 놀이', description: '일주일 용돈 가계부 작성', school_type: 'elementary', month: 11 },

      // ✅ 초등 12월
      { title: '‘고마운 사람’ 편지쓰기', description: '가족, 친구, 동물, 물건 등 대상으로 감사 표현', school_type: 'elementary', month: 12 },
      { title: '1년 1문장 일기 모음집', description: '매월 1문장씩 써서 12장 엮기', school_type: 'elementary', month: 12 },
      { title: '미니 산타 프로젝트', description: '내가 산타라면 어떤 선물을 주고 싶은지 발표하기', school_type: 'elementary', month: 12 },

      // ✅ 중학교 1월
      { title: '새해 다짐 캘린더 만들기', description: '올해 이루고 싶은 목표를 달력에 시각화', school_type: 'middle', month: 1 },
      { title: '감정 컬러링북 활동', description: '감정을 색으로 표현하며 정서 조절 훈련', school_type: 'middle', month: 1 },
      { title: '올해의 나를 표현하는 콜라주', description: '잡지/사진을 활용해 자기이미지를 시각화', school_type: 'middle', month: 1 },

      // (필요시 나머지 중등 2~12월 항목도 이어 작성 가능)
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecommendationItem', null, {});
  }
};
