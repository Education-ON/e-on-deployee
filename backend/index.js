//index.js
// 서버 실행
const app = require('./app');
const PORT = process.env.PORT || 4000; // 환경변수 PORT가 없으면 4000 사용

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중 (포트 ${PORT})`);
});

const selectRouter = require('./routes/select');
app.use('/api/select', selectRouter);

// Cron Job 실행 (2월 28일과 8월 31일에 자동으로 지역별 평균 학사일정 재생성)
const { startAverageScheduleJob } = require('./scripts/averageScheduleCron');
startAverageScheduleJob();