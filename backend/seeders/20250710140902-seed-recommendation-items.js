'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecommendationItem', [
      // ✅ 초등 1월
      //1학년
      { title: '자기만의 책 만들기', description: '나를 주제로 한 그림책 또는 포토북 작성', school_type: 'elementary', month: 1 , target_grade: 1, dashboard_id: 1},
      { title: '1일 1책 프로젝트', description: '다양한 주제의 그림책을 읽고 짧은 리뷰 남기기', school_type: 'elementary', month: 1 , target_grade: 1, dashboard_id: 1},
      { title: '명상 놀이', description: '감정카드를 활용해 오늘 감정 돌아보기', school_type: 'elementary', month: 1 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '눈 관찰 일기 쓰기', description: '눈의 모양, 색, 느낌을 관찰하며 감각을 표현하는 글쓰기 활동', school_type: 'elementary', month: 1, target_grade: 2, dashboard_id: 1 },
      { title: '겨울 새 먹이 주기 체험', description: '창밖이나 공원에 새 모이통 만들기', school_type: 'elementary', month: 1, target_grade: 2, dashboard_id: 1 },
      { title: '가족 인터뷰로 나만의 신년 계획 세우기', description: '부모님 인터뷰 후 자신의 계획 정리하기', school_type: 'elementary', month: 1, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '나의 한 해 돌아보기 글쓰기', description: '지난 해 가장 기억에 남는 일을 정리해 글로 써보기', school_type: 'elementary', month: 1, target_grade: 3, dashboard_id: 1 },
      { title: '겨울 생물 조사하기', description: '겨울에 볼 수 있는 동식물 조사하고 정리하기', school_type: 'elementary', month: 1, target_grade: 3, dashboard_id: 1 },
      { title: '내가 만든 보드게임', description: '가족과 함께 즐길 수 있는 게임 규칙과 말판 만들기', school_type: 'elementary', month: 1, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '겨울 스포츠 리포트', description: '스키, 스케이트 등 겨울 스포츠 조사하고 리포트 작성', school_type: 'elementary', month: 1, target_grade: 4, dashboard_id: 1 },
      { title: '1년 목표 비전보드 만들기', description: '사진과 그림으로 이루고 싶은 목표 시각화', school_type: 'elementary', month: 1, target_grade: 4, dashboard_id: 1 },
      { title: '겨울 동화 창작하기', description: '눈, 겨울왕국 등을 소재로 한 동화 작성 및 삽화 넣기', school_type: 'elementary', month: 1, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '나의 성장그래프 그리기', description: '키, 몸무게, 좋아하는 것 등의 변화를 그래프로 표현', school_type: 'elementary', month: 1, target_grade: 5, dashboard_id: 1 },
      { title: '세계 겨울 축제 탐험', description: '세계 여러 나라의 겨울 행사 조사 후 발표자료 만들기', school_type: 'elementary', month: 1, target_grade: 5, dashboard_id: 1 },
      { title: '올해 목표 설정 워크북', description: '학습, 건강, 취미 분야별 계획 세우기', school_type: 'elementary', month: 1, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '진로 로드맵 그리기', description: '내가 꿈꾸는 진로에 필요한 단계들을 시각화', school_type: 'elementary', month: 1, target_grade: 6, dashboard_id: 1 },
      { title: '신문 기사 따라쓰기', description: '하루 1개 기사 선택해 핵심 요약 및 느낀 점 작성', school_type: 'elementary', month: 1, target_grade: 6, dashboard_id: 1 },
      { title: '겨울철 과학 실험', description: '눈, 얼음, 온도 변화 관련 과학 실험 수행 및 기록', school_type: 'elementary', month: 1, target_grade: 6, dashboard_id: 1 },




      // ✅ 초등 2월
      //1학년
      { title: '학용품 DIY 정리함 만들기', description: '창의력 발달 및 자립성 향상', school_type: 'elementary', month: 2 , target_grade: 1, dashboard_id: 1},
      { title: '동네 도서관 체험하기', description: '나만의 조용한 공간 발견하기', school_type: 'elementary', month: 2 , target_grade: 1, dashboard_id: 1},
      { title: '‘나를 소개하는 영상’ 만들기', description: '자기 표현력 향상', school_type: 'elementary', month: 2 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '지난 1년 돌아보기', description: '사진과 그림으로 1년간의 기억을 정리한 책 만들기', school_type: 'elementary', month: 2, target_grade: 2, dashboard_id: 1 },
      { title: '생활 습관 다이어리', description: '기상, 양치, 운동 등 스스로 계획 세우고 실천하기', school_type: 'elementary', month: 2, target_grade: 2, dashboard_id: 1 },
      { title: '봄맞이 화분 가꾸기', description: '씨앗 심고 일주일 간 성장 기록하기', school_type: 'elementary', month: 2, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '신학기 준비 인터뷰', description: '부모님이나 선생님과 새 학기에 대해 이야기 나누기', school_type: 'elementary', month: 2, target_grade: 3, dashboard_id: 1 },
      { title: '봄꽃 관찰 캘린더 만들기', description: '2~3월에 피는 꽃을 주제로 달력 꾸미기', school_type: 'elementary', month: 2, target_grade: 3, dashboard_id: 1 },
      { title: '나만의 규칙 정하기', description: '스스로 정한 학습/생활 규칙을 카드로 만들어 지키기', school_type: 'elementary', month: 2, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '시간표 직접 짜기', description: '자기주도 학습을 위한 주간/일일 시간표 구성', school_type: 'elementary', month: 2, target_grade: 4, dashboard_id: 1 },
      { title: '겨울 별자리 관찰일지', description: '오리온자리 등 겨울 밤하늘 별자리 관찰 후 기록', school_type: 'elementary', month: 2, target_grade: 4, dashboard_id: 1 },
      { title: '과학 퀴즈북 만들기', description: '관심 있는 과학 주제로 OX 퀴즈와 해설 작성', school_type: 'elementary', month: 2, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '우리 가족 예산 짜기', description: '가상의 가족 예산안을 세우고 소비 계획 세우기', school_type: 'elementary', month: 2, target_grade: 5, dashboard_id: 1 },
      { title: '사회 이슈 토론 준비', description: '관심 있는 이슈 주제를 조사하고 찬반 정리', school_type: 'elementary', month: 2, target_grade: 5, dashboard_id: 1 },
      { title: '신학기 자기소개 슬라이드', description: '자신의 강점과 흥미를 발표자료로 구성', school_type: 'elementary', month: 2, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '자기소개 프레젠테이션 만들기', description: '중학교 진학 전, 나를 소개하는 발표자료 구성', school_type: 'elementary', month: 2, target_grade: 6, dashboard_id: 1 },
      { title: '경제 용어 카드 만들기', description: '용돈, 저축, 투자 등 용어 정리와 예시 작성', school_type: 'elementary', month: 2, target_grade: 6, dashboard_id: 1 },
      { title: '중학교 과목 미리 탐색', description: '중학교에서 배우는 과목 소개 자료 조사하고 정리', school_type: 'elementary', month: 2, target_grade: 6, dashboard_id: 1 },







      // ✅ 초등 3월
      //1학년
      { title: '나만의 규칙 만들기', description: '하루 일과표 또는 내가 지키고 싶은 약속 카드 작성', school_type: 'elementary', month: 3 , target_grade: 1, dashboard_id: 1},
      { title: '1일 1감정 그림일기', description: '새로운 환경에서 느끼는 감정 시각화하기', school_type: 'elementary', month: 3 , target_grade: 1, dashboard_id: 1},
      { title: '교통안전 퀴즈 & 체험놀이', description: '실생활 안전 감수성 높이기', school_type: 'elementary', month: 3 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '우리 동네 지도 만들기', description: '산책하며 관찰한 장소들을 직접 그려서 지도 제작', school_type: 'elementary', month: 3, target_grade: 2, dashboard_id: 1 },
      { title: '봄꽃 관찰 도감', description: '동네에서 본 봄꽃을 사진 찍고 이름과 특징 정리', school_type: 'elementary', month: 3, target_grade: 2, dashboard_id: 1 },
      { title: '자기소개 영상 만들기', description: '스스로를 소개하는 영상을 촬영하고 꾸며보기', school_type: 'elementary', month: 3, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '우리 동네 환경 지도 그리기', description: '깨끗한 곳/더러운 곳을 나눠 지도로 표현', school_type: 'elementary', month: 3, target_grade: 3, dashboard_id: 1 },
      { title: '봄맞이 나들이 계획 세우기', description: '가고 싶은 곳을 정해 교통, 준비물 계획해보기', school_type: 'elementary', month: 3, target_grade: 3, dashboard_id: 1 },
      { title: '나를 소개하는 인포그래픽 만들기', description: '좋아하는 것, 잘하는 것 등 나를 이미지로 표현', school_type: 'elementary', month: 3, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '우리 가족 헌법 만들기', description: '가정에서 지켜야 할 약속 5~10가지 정리', school_type: 'elementary', month: 3, target_grade: 4, dashboard_id: 1 },
      { title: '동네 쓰레기 조사 리포트', description: '산책하며 쓰레기 종류 조사하고 해결 방법 제안', school_type: 'elementary', month: 3, target_grade: 4, dashboard_id: 1 },
      { title: '나의 책 소개 영상 만들기', description: '좋아하는 책을 소개하는 짧은 발표 영상 촬영', school_type: 'elementary', month: 3, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '우리 동네 환경 보고서', description: '하천, 공원, 쓰레기 문제 등 직접 관찰하고 정리', school_type: 'elementary', month: 3, target_grade: 5, dashboard_id: 1 },
      { title: '식물 번식 실험 관찰', description: '삽목, 수경재배 등 다양한 번식 방법 실험하고 비교', school_type: 'elementary', month: 3, target_grade: 5, dashboard_id: 1 },
      { title: '나만의 명언 카드 만들기', description: '마음을 움직인 문장을 적고 직접 디자인해 보기', school_type: 'elementary', month: 3, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '나만의 중학교 생존 가이드북', description: '선배 인터뷰나 조사 통해 꿀팁 모아 책으로 만들기', school_type: 'elementary', month: 3, target_grade: 6, dashboard_id: 1 },
      { title: '자기주도학습 체크리스트', description: '공부계획, 실천여부, 피드백을 스스로 점검', school_type: 'elementary', month: 3, target_grade: 6, dashboard_id: 1 },
      { title: '나의 독서 습관 분석', description: '최근 읽은 책 정리하고 독서 성향 파악하기', school_type: 'elementary', month: 3, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 4월
      //1학년
      { title: '도움 주기 챌린지', description: '하루에 한 번 가족이나 친구를 도와주기', school_type: 'elementary', month: 4 , target_grade: 1, dashboard_id: 1},
      { title: '장애이해 카드 만들기', description: '다른 친구들과 다름을 이해하는 교육', school_type: 'elementary', month: 4 , target_grade: 1, dashboard_id: 1},
      { title: '미니 실험노트', description: '집에서도 할 수 있는 간단한 과학 놀이', school_type: 'elementary', month: 4 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '곤충 관찰 노트', description: '집 근처에서 볼 수 있는 곤충 관찰 및 기록하기', school_type: 'elementary', month: 4, target_grade: 2, dashboard_id: 1 },
      { title: '나만의 동화책 쓰기', description: '상상력을 발휘해 주인공, 배경, 이야기 꾸미기', school_type: 'elementary', month: 4, target_grade: 2, dashboard_id: 1 },
      { title: '우산 실험 놀이', description: '비 오는 날 우산, 옷, 물 흐름 등 관찰하고 비교하기', school_type: 'elementary', month: 4, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '텃밭 일기 쓰기', description: '작은 화분이나 텃밭을 가꾸며 식물의 변화를 기록', school_type: 'elementary', month: 4, target_grade: 3, dashboard_id: 1 },
      { title: '동식물 탐험 미션', description: '동네 공원에서 만난 생물을 사진과 함께 정리하기', school_type: 'elementary', month: 4, target_grade: 3, dashboard_id: 1 },
      { title: '환경 보호 포스터 만들기', description: '쓰레기 줄이기, 물 아끼기 등 주제를 정해 그리기', school_type: 'elementary', month: 4, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '과학 실험 브이로그', description: '간단한 실험 과정을 영상으로 찍고 설명하기', school_type: 'elementary', month: 4, target_grade: 4, dashboard_id: 1 },
      { title: '텃밭 작물 생장 그래프', description: '심은 작물의 길이와 잎 수를 표와 그래프로 기록', school_type: 'elementary', month: 4, target_grade: 4, dashboard_id: 1 },
      { title: '환경 뉴스 스크랩북', description: '일주일간 환경 관련 기사 모아 느낀 점 작성', school_type: 'elementary', month: 4, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '인권 만화 그리기', description: '어린이 인권을 주제로 상황 설정 후 만화로 표현', school_type: 'elementary', month: 4, target_grade: 5, dashboard_id: 1 },
      { title: '재활용 분리배출 캠페인 기획', description: '실생활 분리배출 문제를 조사하고 개선방안 제안', school_type: 'elementary', month: 4, target_grade: 5, dashboard_id: 1 },
      { title: '미니 논술 챌린지', description: '매일 5문장씩 생각을 정리하는 짧은 글쓰기 도전', school_type: 'elementary', month: 4, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '환경 탐사 보고서 작성', description: '하천, 산책로 등 지역 환경 조사 후 문제와 제안 정리', school_type: 'elementary', month: 4, target_grade: 6, dashboard_id: 1 },
      { title: 'SNS 뉴스 구별하기 퀴즈 만들기', description: '가짜뉴스, 사실 보도 구분하는 퀴즈 제작', school_type: 'elementary', month: 4, target_grade: 6, dashboard_id: 1 },
      { title: '봄 생물 세밀화 그리기', description: '봄에 볼 수 있는 생물을 관찰하고 정밀하게 그리기', school_type: 'elementary', month: 4, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 5월
      //1학년
      { title: '우리 동네 문화 탐방', description: '지역 박물관이나 역사 명소 방문', school_type: 'elementary', month: 5 , target_grade: 1, dashboard_id: 1},
      { title: '운동 루틴 만들기', description: '매일 10분 운동 루틴으로 자기관리 훈련', school_type: 'elementary', month: 5 , target_grade: 1, dashboard_id: 1},
      { title: '세계 친구 인터뷰 놀이', description: '다른 나라 문화를 알아보고 역할극 해보기', school_type: 'elementary', month: 5 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '감사 카드 만들기', description: '가족, 친구에게 전하는 마음을 카드에 담기', school_type: 'elementary', month: 5, target_grade: 2, dashboard_id: 1 },
      { title: '탐방 보고서 쓰기', description: '박물관·동물원 등 견학 후 그림과 글로 정리하기', school_type: 'elementary', month: 5, target_grade: 2, dashboard_id: 1 },
      { title: '식물 키우기 관찰일지', description: '매일 물 주며 변화 기록하고 그림으로 표현하기', school_type: 'elementary', month: 5, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '가정의 달 인터뷰 영상 만들기', description: '부모님 또는 조부모님께 질문하고 영상으로 기록', school_type: 'elementary', month: 5, target_grade: 3, dashboard_id: 1 },
      { title: '식물 세밀화 그리기', description: '꽃, 잎 등을 자세히 관찰하고 색연필로 표현하기', school_type: 'elementary', month: 5, target_grade: 3, dashboard_id: 1 },
      { title: '내 방 정리 미션 수행표', description: '청소, 정리정돈 목표 세우고 한 주간 실천하기', school_type: 'elementary', month: 5, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '가족 직업 카드 만들기', description: '부모님, 친척의 직업 알아보고 카드로 정리', school_type: 'elementary', month: 5, target_grade: 4, dashboard_id: 1 },
      { title: '하루 소비 분석하기', description: '하루 동안 소비한 돈/시간을 표로 정리하고 느낀 점 작성', school_type: 'elementary', month: 5, target_grade: 4, dashboard_id: 1 },
      { title: '꽃의 구조 관찰 보고서', description: '꽃의 이름, 색, 냄새, 구조를 그림과 함께 작성', school_type: 'elementary', month: 5, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '우리 가족 가계부 만들기', description: '한 달간 소비 내용을 정리하고 가계부 형식으로 기록', school_type: 'elementary', month: 5, target_grade: 5, dashboard_id: 1 },
      { title: '반려동물 보호 캠페인 포스터', description: '동물 복지를 주제로 메시지 전할 포스터 디자인', school_type: 'elementary', month: 5, target_grade: 5, dashboard_id: 1 },
      { title: '가족 인터뷰 기사 작성', description: '가족 한 명을 인터뷰해 짧은 기사처럼 작성', school_type: 'elementary', month: 5, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '과학 논문 따라 읽기', description: '쉬운 청소년 과학 논문 1편 요약하고 이해 정리', school_type: 'elementary', month: 5, target_grade: 6, dashboard_id: 1 },
      { title: '나의 생활 속 통계 만들기', description: '하루 간식 횟수, 공부시간 등 데이터 수집 후 그래프로 표현', school_type: 'elementary', month: 5, target_grade: 6, dashboard_id: 1 },
      { title: '어린이날 권리 카드 만들기', description: '아동의 권리(UNCRC)를 소개하는 카드형 자료 제작', school_type: 'elementary', month: 5, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 6월
      //1학년
      { title: '생태 관찰 일지 쓰기', description: '매일 한 가지 자연물 기록하기', school_type: 'elementary', month: 6 , target_grade: 1, dashboard_id: 1},
      { title: '진로 인터뷰 놀이', description: '‘미래의 나’ 인터뷰 스크립트 써보기', school_type: 'elementary', month: 6 , target_grade: 1, dashboard_id: 1},
      { title: '사이버 예절 보드게임 만들기', description: '디지털 사용습관 반영', school_type: 'elementary', month: 6 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '여름 건강 캠페인 포스터', description: '더위와 모기 예방을 주제로 창의적 포스터 만들기', school_type: 'elementary', month: 6, target_grade: 2, dashboard_id: 1 },
      { title: '곤충 채집 체험', description: '나비, 잠자리 등 채집 후 분류하고 이름 써보기', school_type: 'elementary', month: 6, target_grade: 2, dashboard_id: 1 },
      { title: '기후 일기 쓰기', description: '맑음, 비, 바람 등 날씨 변화 관찰하여 일기 작성', school_type: 'elementary', month: 6, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '내가 만든 날씨 뉴스', description: '일주일간 날씨를 기록하고 방송처럼 말하기 연습', school_type: 'elementary', month: 6, target_grade: 3, dashboard_id: 1 },
      { title: '곤충 분류 노트 만들기', description: '여름 곤충을 날개 유무, 다리 수 등으로 분류', school_type: 'elementary', month: 6, target_grade: 3, dashboard_id: 1 },
      { title: '물의 소중함 퀴즈 만들기', description: '물 낭비 줄이기 주제로 OX 퀴즈 카드 제작', school_type: 'elementary', month: 6, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '기후 변화 캠페인 포스터', description: '지구 온난화와 관련된 주제로 메시지 포스터 제작', school_type: 'elementary', month: 6, target_grade: 4, dashboard_id: 1 },
      { title: '나만의 교통지도 만들기', description: '우리 동네 대중교통·자전거길 등 지도에 표시', school_type: 'elementary', month: 6, target_grade: 4, dashboard_id: 1 },
      { title: '비 오는 날 실험', description: '빗물 양 측정하기, 젖는 속도 비교 등 실험과 기록', school_type: 'elementary', month: 6, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '물 순환 실험 일지', description: '수증기, 응결, 강수 실험하고 개념 정리', school_type: 'elementary', month: 6, target_grade: 5, dashboard_id: 1 },
      { title: '지구촌 기후 변화 조사', description: '기후위기 현황과 해결 사례 조사 후 요약', school_type: 'elementary', month: 6, target_grade: 5, dashboard_id: 1 },
      { title: '나의 미디어 사용 기록표', description: 'TV, 유튜브 등 하루 미디어 사용 시간 시각화', school_type: 'elementary', month: 6, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '시간 캡슐 편지 쓰기', description: '1년 후의 나에게 편지를 쓰고 저장하기', school_type: 'elementary', month: 6, target_grade: 6, dashboard_id: 1 },
      { title: '에너지 절약 실천일지', description: '가정에서의 전기·물 소비 줄이기 기록', school_type: 'elementary', month: 6, target_grade: 6, dashboard_id: 1 },
      { title: '기후 변화 만화 제작', description: '지구온난화 주제를 쉽게 설명하는 4컷 만화 그리기', school_type: 'elementary', month: 6, target_grade: 6, dashboard_id: 1 },








      // ✅ 초등 7월
      //1학년
      { title: '작가 따라 글쓰기', description: '좋아하는 그림책 작가 스타일 따라 써보기', school_type: 'elementary', month: 7 , target_grade: 1, dashboard_id: 1},
      { title: '진로 퀴즈 놀이', description: '다양한 직업을 주제로 카드 게임 만들기', school_type: 'elementary', month: 7 , target_grade: 1, dashboard_id: 1},
      { title: '여름생활계획표 만들기', description: '방학 목표 정하기', school_type: 'elementary', month: 7 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '물의 상태 실험', description: '얼음, 물, 수증기의 상태 변화 직접 실험하고 그리기', school_type: 'elementary', month: 7, target_grade: 2, dashboard_id: 1 },
      { title: '여름 간식 만들기', description: '팥빙수, 과일주스 등 간단한 간식 만들며 레시피 정리', school_type: 'elementary', month: 7, target_grade: 2, dashboard_id: 1 },
      { title: '세계 여행 독서', description: '나라별 그림책 읽고 국기와 문화 소개 카드 만들기', school_type: 'elementary', month: 7, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '우리 동네 여름 지도 만들기', description: '무더위 쉼터, 얼음가게, 그늘 많은 길 등 표시', school_type: 'elementary', month: 7, target_grade: 3, dashboard_id: 1 },
      { title: '여름 방학 도전 리스트 작성', description: '배우고 싶은 것, 읽고 싶은 책 등 계획 세우기', school_type: 'elementary', month: 7, target_grade: 3, dashboard_id: 1 },
      { title: '여름 그림일기 시리즈', description: '수박, 바닷가, 모기 등 여름 관련 주제별 그림일기', school_type: 'elementary', month: 7, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '여름철 안전 캠페인 카드뉴스', description: '물놀이, 일사병 등 예방 수칙 카드형 콘텐츠 제작', school_type: 'elementary', month: 7, target_grade: 4, dashboard_id: 1 },
      { title: '여름 시화 만들기', description: '여름을 주제로 짧은 시와 그림 함께 표현하기', school_type: 'elementary', month: 7, target_grade: 4, dashboard_id: 1 },
      { title: '세계 나라 탐험 보고서', description: '한 나라를 정해 언어, 음식, 문화 조사 후 발표', school_type: 'elementary', month: 7, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '여름철 건강 수칙 카드뉴스', description: '일사병 예방, 탈수 주제로 카드뉴스 디자인', school_type: 'elementary', month: 7, target_grade: 5, dashboard_id: 1 },
      { title: '내가 만든 과학 마술쇼', description: '간단한 과학 원리를 이용한 마술 공연 기획', school_type: 'elementary', month: 7, target_grade: 5, dashboard_id: 1 },
      { title: '1일 1표현 일기 쓰기', description: '매일 다양한 표현(비유, 의성어 등) 사용해 일기 쓰기', school_type: 'elementary', month: 7, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '1일 1토론 주제 정리', description: '사회/환경/문화 관련 주제에 대한 찬반 정리 노트', school_type: 'elementary', month: 7, target_grade: 6, dashboard_id: 1 },
      { title: '여름 방학 과제 매니저', description: '계획, 진행, 완료 상태로 과제 관리보드 만들기', school_type: 'elementary', month: 7, target_grade: 6, dashboard_id: 1 },
      { title: '직업 인터뷰 프로젝트', description: '관심 직업 종사자에게 인터뷰 후 정리', school_type: 'elementary', month: 7, target_grade: 6, dashboard_id: 1 },








      // ✅ 초등 8월
      //1학년
      { title: '광복절 역사 영상 만들기', description: '그림 + 목소리로 짧은 설명 영상 제작', school_type: 'elementary', month: 8 , target_grade: 1, dashboard_id: 1},
      { title: '여름방학 추억 엽서 쓰기', description: '한 달 간 기억에 남는 일 정리', school_type: 'elementary', month: 8 , target_grade: 1, dashboard_id: 1},
      { title: '자연 속 1인 방송 놀이', description: '자연 속에서 주제를 정해 ‘방송놀이’ 하기', school_type: 'elementary', month: 8 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '기상 관측 일기', description: '비, 구름, 태풍 등 날씨 변화 관찰하고 기록하기', school_type: 'elementary', month: 8, target_grade: 2, dashboard_id: 1 },
      { title: '자연 생물 스케치북', description: '여름 여행지에서 본 물고기, 게 등 생물 그리기', school_type: 'elementary', month: 8, target_grade: 2, dashboard_id: 1 },
      { title: '우리집 박물관 만들기', description: '가족 물건을 모아 전시하고 해설지 쓰기', school_type: 'elementary', month: 8, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '여름 과학 실험하기', description: '증발, 태양열, 얼음 녹는 속도 등 실험 관찰', school_type: 'elementary', month: 8, target_grade: 3, dashboard_id: 1 },
      { title: '가족 놀이날 기획하기', description: '보드게임, 퀴즈 등 가족이 즐길 활동 계획하기', school_type: 'elementary', month: 8, target_grade: 3, dashboard_id: 1 },
      { title: '8월 기념일 알아보기', description: '광복절 등 의미 있는 날 조사하고 발표 준비', school_type: 'elementary', month: 8, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '에너지 절약 실천표', description: '일주일간 사용 전기/물 절약을 체크하고 분석', school_type: 'elementary', month: 8, target_grade: 4, dashboard_id: 1 },
      { title: '8월 기념일 미니북', description: '광복절, 입추 등 8월 기념일 소개와 느낀 점 정리', school_type: 'elementary', month: 8, target_grade: 4, dashboard_id: 1 },
      { title: '나만의 추리소설 쓰기', description: '사건, 단서, 반전이 있는 짧은 추리 이야기 창작', school_type: 'elementary', month: 8, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '나라별 전통 음식 조사 보고서', description: '세계 각국의 대표 음식과 관련 문화를 조사', school_type: 'elementary', month: 8, target_grade: 5, dashboard_id: 1 },
      { title: '과학소설 쓰기 프로젝트', description: '과학적 상상력을 바탕으로 한 단편 소설 작성', school_type: 'elementary', month: 8, target_grade: 5, dashboard_id: 1 },
      { title: '광복절 기념 인터뷰 기획', description: '독립운동가 또는 관련 인물을 주제로 질문지 제작', school_type: 'elementary', month: 8, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '자기계발서 읽고 감상문 작성', description: '초등 고학년 추천 도서 읽고 느낀 점 에세이 작성', school_type: 'elementary', month: 8, target_grade: 6, dashboard_id: 1 },
      { title: '과학 퀴즈쇼 만들기', description: '자연, 생물, 물리 등 주제로 OX 또는 객관식 퀴즈 구성', school_type: 'elementary', month: 8, target_grade: 6, dashboard_id: 1 },
      { title: '여름 생태 보고서', description: '여름 곤충, 식물 등을 관찰하고 생태노트로 정리', school_type: 'elementary', month: 8, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 9월
      //1학년
      { title: '‘나의 하루’ 그래프 그리기', description: '하루 시간 사용 시각화해보기', school_type: 'elementary', month: 9 , target_grade: 1, dashboard_id: 1},
      { title: '좋아하는 것 3가지 발표하기', description: '발표력 키우는 활동', school_type: 'elementary', month: 9 , target_grade: 1, dashboard_id: 1},
      { title: '도서 리뷰 유튜버 따라 하기', description: '책 한 권 요약 및 감상 말로 표현', school_type: 'elementary', month: 9 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '추석 전통놀이 체험', description: '윷놀이, 송편 만들기 등 가족과 함께 놀이 체험', school_type: 'elementary', month: 9, target_grade: 2, dashboard_id: 1 },
      { title: '가을 열매 도감 만들기', description: '도토리, 감, 밤 등 관찰하고 특징 정리하기', school_type: 'elementary', month: 9, target_grade: 2, dashboard_id: 1 },
      { title: '나의 꿈 발표 카드', description: '장래희망을 정하고 그 이유와 그림으로 표현하기', school_type: 'elementary', month: 9, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '추석 음식 조사 카드', description: '송편, 전 등 전통음식의 재료와 유래 정리', school_type: 'elementary', month: 9, target_grade: 3, dashboard_id: 1 },
      { title: '가을 소리 찾기 미션', description: '귀 기울여 자연의 소리 듣고 표현하기', school_type: 'elementary', month: 9, target_grade: 3, dashboard_id: 1 },
      { title: '계절 시 쓰기', description: '가을을 주제로 오감 표현을 담은 짧은 시 작성', school_type: 'elementary', month: 9, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '달 관찰 기록장', description: '초승달부터 보름달까지 달의 모양을 그리고 정리', school_type: 'elementary', month: 9, target_grade: 4, dashboard_id: 1 },
      { title: '추석 특집 전통문화 조사', description: '차례, 송편, 놀이 등 전통문화 조사 보고서 작성', school_type: 'elementary', month: 9, target_grade: 4, dashboard_id: 1 },
      { title: '가을 생물 분류카드 만들기', description: '곤충, 식물 등을 분류 기준에 따라 정리', school_type: 'elementary', month: 9, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '가을 하늘 관찰 일기', description: '맑은 날, 구름, 하늘 색 변화 등을 일지로 기록', school_type: 'elementary', month: 9, target_grade: 5, dashboard_id: 1 },
      { title: '추석 전통 의식 조사 카드', description: '차례, 절차, 의미 등을 정리해 카드로 만들기', school_type: 'elementary', month: 9, target_grade: 5, dashboard_id: 1 },
      { title: '나만의 생태 달력 만들기', description: '계절별 생물, 꽃, 기후 등을 달력에 시각화', school_type: 'elementary', month: 9, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '추석 명절 비교 카드뉴스', description: '세계 명절과 비교하여 추석의 특징 소개하기', school_type: 'elementary', month: 9, target_grade: 6, dashboard_id: 1 },
      { title: '나만의 도서 추천 리스트', description: '좋아하는 책 5권 선정 후 소개글과 이유 정리', school_type: 'elementary', month: 9, target_grade: 6, dashboard_id: 1 },
      { title: '가을 관찰 에세이', description: '가을 풍경, 소리, 냄새 등을 주제로 에세이 작성', school_type: 'elementary', month: 9, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 10월
      //1학년
      { title: '추석 문화 알기 놀이', description: '송편 만들기 체험, 가족 인터뷰 등', school_type: 'elementary', month: 10 , target_grade: 1, dashboard_id: 1},
      { title: '한글날 시화 만들기', description: '내가 좋아하는 말로 시 쓰고 꾸미기', school_type: 'elementary', month: 10 , target_grade: 1, dashboard_id: 1},
      { title: '가을 그림일기', description: '자연 관찰 + 감정 기록', school_type: 'elementary', month: 10 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '가을 나뭇잎 비교하기', description: '단풍잎을 모아 색, 모양 비교하며 분류해보기', school_type: 'elementary', month: 10, target_grade: 2, dashboard_id: 1 },
      { title: '가을 소풍 일기 쓰기', description: '야외활동 후 인상 깊은 장면을 그림과 함께 정리', school_type: 'elementary', month: 10, target_grade: 2, dashboard_id: 1 },
      { title: '도서관 탐방기', description: '도서관 방문 후 가장 기억에 남은 책 소개하기', school_type: 'elementary', month: 10, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '우리 동네 역사탐방 기록', description: '가까운 유적지나 기념비 사진과 이야기 정리', school_type: 'elementary', month: 10, target_grade: 3, dashboard_id: 1 },
      { title: '단풍잎 스케치북 만들기', description: '주운 나뭇잎 붙이고 색깔, 느낌, 종류 써보기', school_type: 'elementary', month: 10, target_grade: 3, dashboard_id: 1 },
      { title: '할로윈 분장과 이야기 쓰기', description: '자신이 만든 캐릭터 설정과 짧은 이야기 작성', school_type: 'elementary', month: 10, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '가을 현장학습 일지', description: '자연/박물관 견학 후 느낀 점, 사진, 그림 기록', school_type: 'elementary', month: 10, target_grade: 4, dashboard_id: 1 },
      { title: '우리 지역 축제 조사', description: '가을 지역 축제를 조사하고 가족과 참여 계획 세우기', school_type: 'elementary', month: 10, target_grade: 4, dashboard_id: 1 },
      { title: '단풍잎 크로마토그래피 실험', description: '잎 속 색소 관찰 실험하고 결과 요약', school_type: 'elementary', month: 10, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '가을 동시 낭송회 준비', description: '좋아하는 시를 골라 낭독 연습과 발표 영상 촬영', school_type: 'elementary', month: 10, target_grade: 5, dashboard_id: 1 },
      { title: '전통 놀이 체험 리포트', description: '비석치기, 투호 등 체험 후 규칙과 느낀 점 작성', school_type: 'elementary', month: 10, target_grade: 5, dashboard_id: 1 },
      { title: '나의 SNS 계정 기획', description: '자기PR을 위한 가상의 SNS 화면 구성해보기', school_type: 'elementary', month: 10, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '기후 위기 캠페인 영상 만들기', description: '환경 메시지를 담은 30초 캠페인 영상 제작', school_type: 'elementary', month: 10, target_grade: 6, dashboard_id: 1 },
      { title: '지역 문화유산 소개 포스터', description: '우리 지역의 역사/문화 유산을 조사해 시각 자료로 만들기', school_type: 'elementary', month: 10, target_grade: 6, dashboard_id: 1 },
      { title: '우리 사회 직업군 조사', description: '직업의 종류, 역할, 필요 역량 등 분류 및 정리', school_type: 'elementary', month: 10, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 11월
      //1학년
      { title: '올해의 나 돌아보기', description: '사진 + 말풍선 + 나만의 상장 만들기', school_type: 'elementary', month: 11 , target_grade: 1, dashboard_id: 1},
      { title: '어린이 뉴스 발표회', description: '관심 있는 뉴스 요약해서 발표 놀이', school_type: 'elementary', month: 11 , target_grade: 1, dashboard_id: 1},
      { title: '가계부 놀이', description: '일주일 용돈 가계부 작성', school_type: 'elementary', month: 11 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '도서 추천 포스터 만들기', description: '좋아하는 책을 소개하는 포스터 제작', school_type: 'elementary', month: 11, target_grade: 2, dashboard_id: 1 },
      { title: '홈트 운동 루틴 만들기', description: '집에서 할 수 있는 스트레칭과 동작 정리', school_type: 'elementary', month: 11, target_grade: 2, dashboard_id: 1 },
      { title: '가을 마지막 하루 그림일기', description: '가을의 끝자락에서 본 풍경을 그림과 글로 표현', school_type: 'elementary', month: 11, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '우리 가족 직업 인터뷰', description: '가족이 하는 일에 대해 질문하고 기록하기', school_type: 'elementary', month: 11, target_grade: 3, dashboard_id: 1 },
      { title: '올해의 뉴스 정리하기', description: '기억에 남는 사회 이슈를 찾아보고 느낀 점 쓰기', school_type: 'elementary', month: 11, target_grade: 3, dashboard_id: 1 },
      { title: '3행시 & 4행시 모음집 만들기', description: '가을, 학교, 친구 등 주제로 재치 있게 짓기', school_type: 'elementary', month: 11, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '시간 관리표 만들기', description: '공부·놀이 균형 있는 주간 계획표 작성', school_type: 'elementary', month: 11, target_grade: 4, dashboard_id: 1 },
      { title: '세계 전통의상 조사하기', description: '나라별 전통의상 특징 정리하고 그리기', school_type: 'elementary', month: 11, target_grade: 4, dashboard_id: 1 },
      { title: '올해의 나를 표현한 시 만들기', description: '한 해를 돌아보며 나의 변화와 성장 시로 표현', school_type: 'elementary', month: 11, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '직업 인터뷰 기사 쓰기', description: '꿈꾸는 직업의 현직자를 인터뷰하거나 조사해 기사 작성', school_type: 'elementary', month: 11, target_grade: 5, dashboard_id: 1 },
      { title: '우리 마을 전설 책 만들기', description: '마을에 전해지는 이야기나 지명 유래 정리해 보기', school_type: 'elementary', month: 11, target_grade: 5, dashboard_id: 1 },
      { title: '1년의 나 돌아보기 PPT', description: '올해 배운 것, 달라진 점, 뿌듯했던 일 발표 정리', school_type: 'elementary', month: 11, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '가계부 앱 사용 후기 쓰기', description: '실제 가계부 앱 사용해보고 장단점 정리', school_type: 'elementary', month: 11, target_grade: 6, dashboard_id: 1 },
      { title: '나의 미디어 사용 습관 보고서', description: '1주일간의 스마트폰, TV 사용 분석과 개선 계획', school_type: 'elementary', month: 11, target_grade: 6, dashboard_id: 1 },
      { title: '나만의 뉴스레터 만들기', description: '주간 소식, 책 리뷰, 팁 등을 담은 뉴스레터 제작', school_type: 'elementary', month: 11, target_grade: 6, dashboard_id: 1 },






      // ✅ 초등 12월
      //1학년
      { title: '‘고마운 사람’ 편지쓰기', description: '가족, 친구, 동물, 물건 등 대상으로 감사 표현', school_type: 'elementary', month: 12 , target_grade: 1, dashboard_id: 1},
      { title: '1년 1문장 일기 모음집', description: '매월 1문장씩 써서 12장 엮기', school_type: 'elementary', month: 12 , target_grade: 1, dashboard_id: 1},
      { title: '미니 산타 프로젝트', description: '내가 산타라면 어떤 선물을 주고 싶은지 발표하기', school_type: 'elementary', month: 12 , target_grade: 1, dashboard_id: 1},
      //2학년
      { title: '올해의 명장면 앨범 만들기', description: '가장 기억에 남는 순간을 사진과 글로 모으기', school_type: 'elementary', month: 12, target_grade: 2, dashboard_id: 1 },
      { title: '크리스마스 장식 만들기', description: '트리, 카드 등 나만의 장식품 만들기', school_type: 'elementary', month: 12, target_grade: 2, dashboard_id: 1 },
      { title: '감정카드로 1년 돌아보기', description: '기쁨, 놀람, 뿌듯함 등 감정을 되새기며 정리하기', school_type: 'elementary', month: 12, target_grade: 2, dashboard_id: 1 },
      //3학년
      { title: '한 해 되돌아보기 다이어리', description: '성장한 점, 도전한 일 등 정리하고 나만의 표지 만들기', school_type: 'elementary', month: 12, target_grade: 3, dashboard_id: 1 },
      { title: '연말 감사 카드 보내기', description: '감사한 사람에게 손글씨 카드 쓰기', school_type: 'elementary', month: 12, target_grade: 3, dashboard_id: 1 },
      { title: '겨울 명절과 세계의 연말 알아보기', description: '크리스마스 외 다른 나라 연말 문화 조사', school_type: 'elementary', month: 12, target_grade: 3, dashboard_id: 1 },
      //4학년
      { title: '연말 뉴스 발표하기', description: '가장 인상 깊은 사건을 선정하고 친구들에게 발표 연습', school_type: 'elementary', month: 12, target_grade: 4, dashboard_id: 1 },
      { title: '크리스마스 연극 기획', description: '역할 분담, 대사 작성, 소품 준비하여 가족 앞 공연', school_type: 'elementary', month: 12, target_grade: 4, dashboard_id: 1 },
      { title: '새해 편지 쓰기', description: '내년의 나에게 또는 친구, 가족에게 격려 편지 작성', school_type: 'elementary', month: 12, target_grade: 4, dashboard_id: 1 },
      //5학년
      { title: '1년간의 독서 정리북', description: '읽은 책 목록과 감상, 별점 등을 정리해 책으로 만들기', school_type: 'elementary', month: 12, target_grade: 5, dashboard_id: 1 },
      { title: '새해 소망 소등식', description: '촛불을 켜고 올해 기억/감사/소망을 나누는 활동 기획', school_type: 'elementary', month: 12, target_grade: 5, dashboard_id: 1 },
      { title: '크리스마스 전통 세계 탐험', description: '나라별 크리스마스 문화 조사하고 발표 정리', school_type: 'elementary', month: 12, target_grade: 5, dashboard_id: 1 },
      //6학년
      { title: '올해의 나 발표자료', description: '성장, 배움, 실천 등 올해의 나를 주제로 PPT 만들기', school_type: 'elementary', month: 12, target_grade: 6, dashboard_id: 1 },
      { title: '감사한 사람 인터뷰 편지', description: '감사한 인물에게 짧은 인터뷰 후 손편지 쓰기', school_type: 'elementary', month: 12, target_grade: 6, dashboard_id: 1 },
      { title: '새해맞이 나의 선언 포스터', description: '새해 나의 다짐을 문구와 이미지로 표현해 포스터 제작', school_type: 'elementary', month: 12, target_grade: 6, dashboard_id: 1 },



      // ✅ 중학교 1학년
    // 1월
    { title: '새해 다짐 캘린더 만들기', description: '올해 이루고 싶은 목표를 달력에 시각화', school_type: 'middle', month: 1 , target_grade: 7, dashboard_id: 1 },
    { title: '감정 컬러링북 활동', description: '감정을 색으로 표현하며 정서 조절 훈련', school_type: 'middle', month: 1 , target_grade: 7, dashboard_id: 1 },
    { title: '올해의 나를 표현하는 콜라주', description: '잡지/사진을 활용해 자기이미지를 시각화', school_type: 'middle', month: 1 , target_grade: 7, dashboard_id: 1 },

    // 2월
    { title: '시간관리 루틴 플래너 작성', description: '아침 루틴/공부계획 등을 직접 설계해보기', school_type: 'middle', month: 2 , target_grade: 7, dashboard_id: 1 },
    { title: '중학교 과목 탐색 카드 만들기', description: '국영수사과 등 교과목별 특징 정리', school_type: 'middle', month: 2 , target_grade: 7, dashboard_id: 1 },
    { title: '나를 표현하는 자기소개 영상 만들기', description: '중학교 입학 전 자기 표현력 키우기 프로젝트', school_type: 'middle', month: 2 , target_grade: 7, dashboard_id: 1 },

    // 3월
    { title: '중학교 생활 적응 체크리스트', description: '신입생이 겪는 어려움과 해결법 정리', school_type: 'middle', month: 3 , target_grade: 7, dashboard_id: 1 },
    { title: '관심 있는 진로 조사 포스터', description: '앞으로 해보고 싶은 직업을 조사해 시각화', school_type: 'middle', month: 3 , target_grade: 7, dashboard_id: 1 },
    { title: '학교 친구 인터뷰 과제', description: '친구에게 질문하고 공통점/차이점 찾아보기', school_type: 'middle', month: 3 , target_grade: 7, dashboard_id: 1 },

    // 4월
    { title: '봄 생태 관찰 노트', description: '식물, 곤충, 날씨 등을 관찰하고 기록하기', school_type: 'middle', month: 4 , target_grade: 7, dashboard_id: 1 },
    { title: '마음 일기 5일 챌린지', description: '매일 감정을 돌아보며 일기쓰기 훈련', school_type: 'middle', month: 4 , target_grade: 7, dashboard_id: 1 },
    { title: '내 방 업사이클링 프로젝트', description: '버려진 물건을 활용해 방 꾸미기 실천', school_type: 'middle', month: 4 , target_grade: 7, dashboard_id: 1 },

    // 5월
    { title: '가정의 달 감사편지 쓰기', description: '부모님이나 가족에게 마음 전하기', school_type: 'middle', month: 5 , target_grade: 7, dashboard_id: 1 },
    { title: '식물 키우기 관찰일지', description: '직접 심은 씨앗이 자라는 과정 매일 기록하기', school_type: 'middle', month: 5 , target_grade: 7, dashboard_id: 1 },
    { title: '동네 탐방 미션지 작성', description: '우리 지역 명소나 상점 등을 조사하여 지도 제작', school_type: 'middle', month: 5 , target_grade: 7, dashboard_id: 1 },

    // 6월
    { title: '건강 식단 카드뉴스 만들기', description: '10대에게 좋은 음식과 식습관을 시각자료로 표현', school_type: 'middle', month: 6 , target_grade: 7, dashboard_id: 1 },
    { title: '날씨 기록 통계표 만들기', description: '1주일간 날씨 변화 관찰 후 그래프 그리기', school_type: 'middle', month: 6 , target_grade: 7, dashboard_id: 1 },
    { title: '자기 감정 스티커북 만들기', description: '상황별 감정을 색깔, 말풍선으로 표현해 보기', school_type: 'middle', month: 6 , target_grade: 7, dashboard_id: 1 },

    // 7월
    { title: '나만의 여름방학 계획표', description: '공부, 휴식, 취미 등을 포함한 방학 스케줄 작성', school_type: 'middle', month: 7 , target_grade: 7, dashboard_id: 1 },
    { title: '과학 실험 영상 따라해보기', description: '온라인 영상 보며 결과 예측하고 실험노트 작성', school_type: 'middle', month: 7 , target_grade: 7, dashboard_id: 1 },
    { title: '기후위기 뉴스 정리하기', description: '환경 관련 뉴스를 조사해 나만의 요약노트 제작', school_type: 'middle', month: 7 , target_grade: 7, dashboard_id: 1 },

    // 8월
    { title: '도서 리뷰 카드 만들기', description: '여름에 읽은 책을 1장 요약+리뷰로 정리', school_type: 'middle', month: 8 , target_grade: 7, dashboard_id: 1 },
    { title: '직업 흥미 검사 해보기', description: '검사 결과를 바탕으로 나에게 맞는 직업 분석', school_type: 'middle', month: 8 , target_grade: 7, dashboard_id: 1 },
    { title: '광복절 역사 카드북', description: '광복절의 의미와 인물 정리하는 학습 카드북 만들기', school_type: 'middle', month: 8 , target_grade: 7, dashboard_id: 1 },

    // 9월
    { title: '나의 시간관리 셀프진단', description: '시간 낭비 원인을 찾고 개선계획 세우기', school_type: 'middle', month: 9 , target_grade: 7, dashboard_id: 1 },
    { title: '추석 음식 포스터', description: '전통 음식의 재료와 유래를 조사해 그리기', school_type: 'middle', month: 9 , target_grade: 7, dashboard_id: 1 },
    { title: '나만의 뉴스레터 만들기', description: '관심 주제로 주간 뉴스레터 형태 콘텐츠 제작', school_type: 'middle', month: 9 , target_grade: 7, dashboard_id: 1 },

    // 10월
    { title: '가을 시 쓰기 프로젝트', description: '가을을 느낄 수 있는 오감 표현 중심의 시 쓰기', school_type: 'middle', month: 10 , target_grade: 7, dashboard_id: 1 },
    { title: '우리 고장 문화유산 탐방기록', description: '현장 또는 온라인으로 조사하고 보고서 작성', school_type: 'middle', month: 10 , target_grade: 7, dashboard_id: 1 },
    { title: '할로윈 캐릭터 만들기', description: '가상의 캐릭터를 그리고 배경 이야기를 만들기', school_type: 'middle', month: 10 , target_grade: 7, dashboard_id: 1 },

    // 11월
    { title: '나의 감정기록 그래프 만들기', description: '한 달간 감정 변화를 그래프로 나타내기', school_type: 'middle', month: 11 , target_grade: 7, dashboard_id: 1 },
    { title: 'SNS 뉴스 비판적 읽기', description: '팩트 체크 방법을 익히고 사례 조사', school_type: 'middle', month: 11 , target_grade: 7, dashboard_id: 1 },
    { title: '연말 봉사 아이디어 회의', description: '청소년이 할 수 있는 봉사 아이디어 기획서 작성', school_type: 'middle', month: 11 , target_grade: 7, dashboard_id: 1 },

    // 12월
    { title: '올해의 나를 돌아보는 에세이', description: '가장 기억에 남는 사건과 배운 점 정리', school_type: 'middle', month: 12 , target_grade: 7, dashboard_id: 1 },
    { title: '친구에게 쓰는 감사 편지', description: '한 해 동안 고마웠던 친구에게 손편지 쓰기', school_type: 'middle', month: 12 , target_grade: 7, dashboard_id: 1 },
    { title: '새해 목표 비전보드 만들기', description: '2025년 목표를 시각자료로 정리', school_type: 'middle', month: 12 , target_grade: 7, dashboard_id: 1 },


      // ✅ 중학교 2학년
      // 1월
      { title: '작년 내 인생 그래프 그리기', description: '작년의 기쁨과 도전을 곡선으로 표현', school_type: 'middle', month: 1, target_grade: 8, dashboard_id: 1 },
      { title: '신년 인터뷰북 만들기', description: '가족이나 친구를 인터뷰해 새해 소망 기록', school_type: 'middle', month: 1, target_grade: 8, dashboard_id: 1 },
      { title: '감정 다이어리 챌린지', description: '감정을 단어·이모지·컬러로 기록해보는 프로젝트', school_type: 'middle', month: 1, target_grade: 8, dashboard_id: 1 },

      // 2월
      { title: '중1을 돌아보는 리플렉션 저널', description: '1학년 때 성장한 점, 아쉬운 점을 정리', school_type: 'middle', month: 2, target_grade: 8, dashboard_id: 1 },
      { title: '2학년 교과 탐색 카드 작성', description: '새로 배우는 과목을 정리하고 예상 난이도 매기기', school_type: 'middle', month: 2, target_grade: 8, dashboard_id: 1 },
      { title: '나만의 성향 테스트 만들기', description: 'MBTI처럼 친구들이 할 수 있는 심리테스트 제작', school_type: 'middle', month: 2, target_grade: 8, dashboard_id: 1 },

      // 3월
      { title: '학급 역할 포스터 만들기', description: '학교에서 맡은 역할을 소개하는 포스터 제작', school_type: 'middle', month: 3, target_grade: 8, dashboard_id: 1 },
      { title: '진로 키워드 정리 노트', description: '관심 있는 진로를 키워드 중심으로 시각화 정리', school_type: 'middle', month: 3, target_grade: 8, dashboard_id: 1 },
      { title: '학습 목표 & 점검표 만들기', description: '교과별 학습 목표를 세우고 월별 점검하기', school_type: 'middle', month: 3, target_grade: 8, dashboard_id: 1 },

      // 4월
      { title: '자연 속 과학 관찰카드', description: '봄 생물이나 현상을 관찰하고 과학 개념 연결하기', school_type: 'middle', month: 4, target_grade: 8, dashboard_id: 1 },
      { title: '하루의 소비 분석 그래프', description: '하루 동안 쓴 시간, 돈 등을 수치로 분석', school_type: 'middle', month: 4, target_grade: 8, dashboard_id: 1 },
      { title: 'SNS 글쓰기 훈련', description: '사회적 이슈를 주제로 300자 이내의 짧은 글 써보기', school_type: 'middle', month: 4, target_grade: 8, dashboard_id: 1 },

      // 5월
      { title: '가정의 달 나의 감사 캘린더', description: '매일 감사한 사람이나 순간을 기록하는 달력 만들기', school_type: 'middle', month: 5, target_grade: 8, dashboard_id: 1 },
      { title: '건강 챌린지 플래너', description: '운동, 수면, 식사 계획을 주간 단위로 체크해보기', school_type: 'middle', month: 5, target_grade: 8, dashboard_id: 1 },
      { title: '청소년 권리 포스터 제작', description: '학생의 권리와 의무를 주제로 홍보 포스터 만들기', school_type: 'middle', month: 5, target_grade: 8, dashboard_id: 1 },

      // 6월
      { title: '인터넷 예절 뉴스레터 만들기', description: '사이버폭력, 댓글 문화 등 문제를 다룬 카드뉴스 제작', school_type: 'middle', month: 6, target_grade: 8, dashboard_id: 1 },
      { title: '여름 대비 미니 건강북', description: '일사병, 탈수 예방을 위한 정보를 모아 책으로 만들기', school_type: 'middle', month: 6, target_grade: 8, dashboard_id: 1 },
      { title: '하루 에너지 소비 줄이기 실천', description: '전기/물/플라스틱 줄이기 미션 수행일지 작성', school_type: 'middle', month: 6, target_grade: 8, dashboard_id: 1 },

      // 7월
      { title: '여름방학 목표 보드 만들기', description: '도전과제를 이미지로 표현한 비전보드 제작', school_type: 'middle', month: 7, target_grade: 8, dashboard_id: 1 },
      { title: '관심 직업 리서치 포스터', description: '희망 직업의 역할, 진로경로, 필요역량 조사', school_type: 'middle', month: 7, target_grade: 8, dashboard_id: 1 },
      { title: '10대 건강 뉴스 스크랩', description: '청소년 건강 관련 기사 모아 정리·비평', school_type: 'middle', month: 7, target_grade: 8, dashboard_id: 1 },

      // 8월
      { title: '나만의 토론 주제 정리집', description: '관심 주제에 대한 찬반 정리와 근거 찾기', school_type: 'middle', month: 8, target_grade: 8, dashboard_id: 1 },
      { title: '8월의 역사 정리 카드북', description: '광복절, 세계사 사건 등을 카드 형식으로 정리', school_type: 'middle', month: 8, target_grade: 8, dashboard_id: 1 },
      { title: '나만의 여름 독서 인스타 만들기', description: '책 표지, 한 줄 감상, 추천 이유를 카드뉴스 형식으로 제작', school_type: 'middle', month: 8, target_grade: 8, dashboard_id: 1 },

      // 9월
      { title: '가을 자연 관찰 저널', description: '하루 10분 자연을 관찰하고 기록하는 감성 일지', school_type: 'middle', month: 9, target_grade: 8, dashboard_id: 1 },
      { title: '추석 음식 문화 비교', description: '한국과 세계의 명절 음식 비교 보고서 작성', school_type: 'middle', month: 9, target_grade: 8, dashboard_id: 1 },
      { title: 'SNS 피드 만들기 과제', description: '진로, 취미 등을 주제로 한 가상의 SNS 피드 디자인', school_type: 'middle', month: 9, target_grade: 8, dashboard_id: 1 },

      // 10월
      { title: '10대 권리 선언문 만들기', description: '청소년 권리에 대해 생각하고 나만의 선언문 작성', school_type: 'middle', month: 10, target_grade: 8, dashboard_id: 1 },
      { title: '가을 여행지 홍보 카드 만들기', description: '가을 여행지 1곳을 선정해 홍보 포스터 제작', school_type: 'middle', month: 10, target_grade: 8, dashboard_id: 1 },
      { title: '가상의 정책 제안서 쓰기', description: '학교나 사회 문제 해결을 위한 정책 아이디어 정리', school_type: 'middle', month: 10, target_grade: 8, dashboard_id: 1 },

      // 11월
      { title: '연말 체크리스트 & 회고 일지', description: '올해를 돌아보며 성취, 실수, 배운 점 정리', school_type: 'middle', month: 11, target_grade: 8, dashboard_id: 1 },
      { title: '디지털 시민 선언문 만들기', description: '바람직한 온라인 행동을 위한 약속 만들기', school_type: 'middle', month: 11, target_grade: 8, dashboard_id: 1 },
      { title: '10대 소비 생활 점검표', description: '한 달 소비 패턴을 분석하고 절약 계획 세우기', school_type: 'middle', month: 11, target_grade: 8, dashboard_id: 1 },

      // 12월
      { title: '한 해 성장 스토리북 제작', description: '올해 가장 의미 있었던 순간을 글과 그림으로 표현', school_type: 'middle', month: 12, target_grade: 8, dashboard_id: 1 },
      { title: '미래의 나에게 영상편지', description: '3년 후 나에게 하고 싶은 말을 영상으로 남기기', school_type: 'middle', month: 12, target_grade: 8, dashboard_id: 1 },
      { title: '내년 목표 로드맵', description: '새해의 목표를 단계별 계획과 함께 정리', school_type: 'middle', month: 12, target_grade: 8, dashboard_id: 1 },

      // ✅ 중학교 3학년      
      // 1월
      { title: '고등학교 과목 탐색 노트', description: '계열별 고교 과목과 학습 내용 조사해 정리', school_type: 'middle', month: 1, target_grade: 9, dashboard_id: 1 },
      { title: '고등 진학 전 체크리스트', description: '진로, 생활, 학습 등 입학 전 준비사항 점검', school_type: 'middle', month: 1, target_grade: 9, dashboard_id: 1 },
      { title: '내 인생 연대표 작성', description: '지금까지의 주요 사건과 기억을 타임라인으로 구성', school_type: 'middle', month: 1, target_grade: 9, dashboard_id: 1 },

      // 2월
      { title: '자기소개서 초안 써보기', description: '나의 강점과 경험을 정리해 글로 써보기', school_type: 'middle', month: 2, target_grade: 9, dashboard_id: 1 },
      { title: '고등학교 생활 예측 시나리오', description: '고등학교 1학년의 하루를 상상해 글로 표현', school_type: 'middle', month: 2, target_grade: 9, dashboard_id: 1 },
      { title: '중학교 3년 회고 리포트', description: '학업, 친구, 활동 등 돌아보며 성장 기록 작성', school_type: 'middle', month: 2, target_grade: 9, dashboard_id: 1 },

      // 3월
      { title: '고등 진학 목표 설정 보드', description: '1학기 학습/생활 목표를 시각화해 정리', school_type: 'middle', month: 3, target_grade: 9, dashboard_id: 1 },
      { title: '사회 이슈 뉴스 요약 챌린지', description: '최근 사회 이슈를 조사하고 3문장으로 요약', school_type: 'middle', month: 3, target_grade: 9, dashboard_id: 1 },
      { title: '관심 학과 진로 조사', description: '대학 전공과 관련 직업, 적성 등을 정리한 자료 제작', school_type: 'middle', month: 3, target_grade: 9, dashboard_id: 1 },

      // 4월
      { title: '입시 용어 카드 만들기', description: '내신, 정시, 수시 등 입시 용어 정리', school_type: 'middle', month: 4, target_grade: 9, dashboard_id: 1 },
      { title: '청소년 권리 신문 만들기', description: '학생인권 조례 등 권리와 관련된 기획기사 작성', school_type: 'middle', month: 4, target_grade: 9, dashboard_id: 1 },
      { title: '생활 시간 사용 기록 프로젝트', description: '1주일간 활동 시간 기록 후 분석 리포트 작성', school_type: 'middle', month: 4, target_grade: 9, dashboard_id: 1 },

      // 5월
      { title: '가족/부모 인터뷰 프로젝트', description: '가족의 진학 경험과 조언을 인터뷰하고 요약', school_type: 'middle', month: 5, target_grade: 9, dashboard_id: 1 },
      { title: '진로 OX 퀴즈 제작', description: '직업, 전공과 관련된 정보로 퀴즈 구성하기', school_type: 'middle', month: 5, target_grade: 9, dashboard_id: 1 },
      { title: '나의 독서 목록 리플렉션', description: '올해 읽은 책과 느낀 점, 독서 습관 점검', school_type: 'middle', month: 5, target_grade: 9, dashboard_id: 1 },

      // 6월
      { title: '기후위기 발표자료 만들기', description: '자료조사 후 슬라이드로 발표자료 구성', school_type: 'middle', month: 6, target_grade: 9, dashboard_id: 1 },
      { title: '고교 생활에 필요한 역량 리스트', description: '자기관리, 독해력, 체력 등 필요한 역량을 정리', school_type: 'middle', month: 6, target_grade: 9, dashboard_id: 1 },
      { title: '나만의 공부법 소개 카드뉴스', description: '효과적인 공부 방법을 정리해 카드형 자료 제작', school_type: 'middle', month: 6, target_grade: 9, dashboard_id: 1 },

      // 7월
      { title: '방학 기간 프로젝트 기획서', description: '학습, 진로, 생활 계획을 문서로 정리해 실천하기', school_type: 'middle', month: 7, target_grade: 9, dashboard_id: 1 },
      { title: '여름방학 독서 챌린지 플랜', description: '읽고 싶은 책과 목표, 독후활동 미리 계획하기', school_type: 'middle', month: 7, target_grade: 9, dashboard_id: 1 },
      { title: '진로 영상 감상문 작성', description: '직업 관련 다큐나 유튜브 영상 감상 후 기록', school_type: 'middle', month: 7, target_grade: 9, dashboard_id: 1 },

      // 8월
      { title: '청소년 경제 프로젝트', description: '용돈관리, 저축, 소비 계획 수립 및 실행기 작성', school_type: 'middle', month: 8, target_grade: 9, dashboard_id: 1 },
      { title: '광복절 인물 리서치 리포트', description: '독립운동가를 조사하고 발표자료로 구성', school_type: 'middle', month: 8, target_grade: 9, dashboard_id: 1 },
      { title: '고등 생활 질문지 만들기', description: '선배에게 묻고 싶은 10가지 질문 정리하기', school_type: 'middle', month: 8, target_grade: 9, dashboard_id: 1 },

      // 9월
      { title: '3학년 2학기 목표 선언문', description: '학기 초 자신의 학습·생활 목표를 문장으로 정리', school_type: 'middle', month: 9, target_grade: 9, dashboard_id: 1 },
      { title: '진학 희망 고교 비교 조사', description: '지원 희망 고등학교의 특징과 조건 비교', school_type: 'middle', month: 9, target_grade: 9, dashboard_id: 1 },
      { title: '나를 위한 응원 엽서 쓰기', description: '스스로에게 힘이 되는 문장과 응원 적기', school_type: 'middle', month: 9, target_grade: 9, dashboard_id: 1 },

      // 10월
      { title: '청소년 권장 영화 감상 후 토론', description: '청소년 성장영화 감상 후 주제 토론문 작성', school_type: 'middle', month: 10, target_grade: 9, dashboard_id: 1 },
      { title: '사회 참여 아이디어 제안서', description: '지역사회 문제를 해결할 아이디어를 문서로 정리', school_type: 'middle', month: 10, target_grade: 9, dashboard_id: 1 },
      { title: '할로윈 행사 기획안', description: '학교 또는 친구들과 함께하는 이벤트 기획해보기', school_type: 'middle', month: 10, target_grade: 9, dashboard_id: 1 },

      // 11월
      { title: '고교 입시 용어 정리 노트', description: '내신, 진로선택과목 등 입시 관련 개념 정리', school_type: 'middle', month: 11, target_grade: 9, dashboard_id: 1 },
      { title: '1년 회고 인터뷰북 만들기', description: '친구/선생님 인터뷰 통해 중학교 생활을 돌아보기', school_type: 'middle', month: 11, target_grade: 9, dashboard_id: 1 },
      { title: '입시 스트레스 해소법 소개', description: '자신만의 감정 조절법을 글이나 그림으로 표현', school_type: 'middle', month: 11, target_grade: 9, dashboard_id: 1 },

      // 12월
      { title: '나의 성장 앨범 만들기', description: '중1~중3까지의 대표 경험을 모아 시각화', school_type: 'middle', month: 12, target_grade: 9, dashboard_id: 1 },
      { title: '고등학교 입학 전 목표 플래너', description: '겨울방학 동안 실천할 목표를 학습/생활로 나누어 정리', school_type: 'middle', month: 12, target_grade: 9, dashboard_id: 1 },
      { title: '졸업 편지쓰기 프로젝트', description: '친구, 선생님, 또는 자신에게 보내는 편지 작성', school_type: 'middle', month: 12, target_grade: 9, dashboard_id: 1 }









    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecommendationItem', null, {});
  }
};
