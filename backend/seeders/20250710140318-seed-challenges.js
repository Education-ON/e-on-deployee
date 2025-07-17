'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Challenge', [
      {
        challenge_title: '하루 만보 걷기 챌린지',
        creator_contact: '010-1234-5678',
        challenge_description: '하루에 만보 걷고 건강도 챙기고!',
        minimum_age: 10,
        maximum_age: 18,
        maximum_people: 30,
        start_date: '2025-06-10 00:00:00',
        end_date: '2025-06-30 23:59:59',
        application_deadline: '2025-06-09 23:59:59',
        is_recuming: false,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: null,
        user_id: 1
      },
      {
        challenge_title: '아침 독서 챌린지',
        creator_contact: '010-2345-6789',
        challenge_description: '매일 아침 20분씩 책 읽기',
        minimum_age: 12,
        maximum_age: 16,
        maximum_people: 20,
        start_date: '2025-07-01 00:00:00',
        end_date: '2025-07-15 23:59:59',
        application_deadline: '2025-06-30 23:59:59',
        is_recuming: true,
        challenge_state: 'ACTIVE',
        intermediate_participation: true,
        repeat_type: 'WEEKLY',
        user_id: 2
      },
      {
        challenge_title: '주말 코딩 캠프',
        creator_contact: '010-3456-7890',
        challenge_description: '주말마다 새로운 코딩 미션 도전!',
        minimum_age: 13,
        maximum_age: 18,
        maximum_people: 15,
        start_date: '2025-06-15 09:00:00',
        end_date: '2025-07-20 18:00:00',
        application_deadline: '2025-06-14 18:00:00',
        is_recuming: true,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: 'WEEKLY',
        user_id: 3
      },
      {
        challenge_title: '한 달 영어일기',
        creator_contact: '010-4567-8901',
        challenge_description: '하루 한 줄 영어일기 쓰기!',
        minimum_age: 10,
        maximum_age: 18,
        maximum_people: 25,
        start_date: '2025-07-01 08:00:00',
        end_date: '2025-07-31 23:59:59',
        application_deadline: '2025-06-30 23:59:59',
        is_recuming: false,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: null,
        user_id: 4
      },
      {
        challenge_title: '나만의 그림 일기',
        creator_contact: '010-5678-9012',
        challenge_description: '매일 한 컷 그림 그리기, 창의력 쑥쑥!',
        minimum_age: 8,
        maximum_age: 16,
        maximum_people: 20,
        start_date: '2025-06-20 00:00:00',
        end_date: '2025-07-10 23:59:59',
        application_deadline: '2025-06-19 23:59:59',
        is_recuming: false,
        challenge_state: 'ACTIVE',
        intermediate_participation: true,
        repeat_type: null,
        user_id: 5
      },
      {
        challenge_title: '스포츠 리더십 캠프',
        creator_contact: '010-6789-0123',
        challenge_description: '스포츠로 배우는 리더십!',
        minimum_age: 14,
        maximum_age: 18,
        maximum_people: 30,
        start_date: '2025-07-05 09:00:00',
        end_date: '2025-07-25 18:00:00',
        application_deadline: '2025-07-04 18:00:00',
        is_recuming: true,
        challenge_state: 'ACTIVE',
        intermediate_participation: true,
        repeat_type: 'WEEKLY',
        user_id: 6
      },
      {
        challenge_title: '친환경 챌린지',
        creator_contact: '010-1234-5678',
        challenge_description: '일주일에 플라스틱 1개만 쓰기!',
        minimum_age: 12,
        maximum_age: 18,
        maximum_people: 40,
        start_date: '2025-07-10 00:00:00',
        end_date: '2025-07-24 23:59:59',
        application_deadline: '2025-07-09 23:59:59',
        is_recuming: false,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: null,
        user_id: 1
      },
      {
        challenge_title: '아침 요가 챌린지',
        creator_contact: '010-2345-6789',
        challenge_description: '매일 아침 10분 요가로 건강한 하루 시작!',
        minimum_age: 10,
        maximum_age: 18,
        maximum_people: 20,
        start_date: '2025-06-25 07:00:00',
        end_date: '2025-07-05 08:00:00',
        application_deadline: '2025-06-24 23:59:59',
        is_recuming: true,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: 'DAILY',
        user_id: 2
      },
      {
        challenge_title: '파이썬 30일 챌린지',
        creator_contact: '010-3456-7890',
        challenge_description: '매일 한 문제씩 파이썬 코딩 도전!',
        minimum_age: 14,
        maximum_age: 18,
        maximum_people: 20,
        start_date: '2025-07-01 00:00:00',
        end_date: '2025-07-30 23:59:59',
        application_deadline: '2025-06-30 23:59:59',
        is_recuming: true,
        challenge_state: 'ACTIVE',
        intermediate_participation: true,
        repeat_type: 'DAILY',
        user_id: 3
      },
      {
        challenge_title: '뮤지컬 마스터 클래스',
        creator_contact: '010-4567-8901',
        challenge_description: '노래와 연기 모두 마스터해요!',
        minimum_age: 12,
        maximum_age: 18,
        maximum_people: 15,
        start_date: '2025-08-01 10:00:00',
        end_date: '2025-08-15 17:00:00',
        application_deadline: '2025-07-31 23:59:59',
        is_recuming: false,
        challenge_state: 'ACTIVE',
        intermediate_participation: false,
        repeat_type: null,
        user_id: 4
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Challenge', {
      challenge_title: [
        '하루 만보 걷기 챌린지', '아침 독서 챌린지', '주말 코딩 캠프',
        '한 달 영어일기', '나만의 그림 일기', '스포츠 리더십 캠프',
        '친환경 챌린지', '아침 요가 챌린지', '파이썬 30일 챌린지', '뮤지컬 마스터 클래스'
      ]
    });
  }
};
