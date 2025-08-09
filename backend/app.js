require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const aiRecommendRoutes = require('./routes/aiRecommendRoutes');
const adminRouter = require('./routes/adminRouter');
// 반드시 전략 등록 전에 실행
require("./config/passport")(passport);
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { rawConnection: db, sequelize } = require("./database/db");
const app = express();

app.set('trust proxy', 1);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.js
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // 15분마다 만료 세션 정리
  expiration: 24 * 60 * 60 * 1000,         // 세션 저장소 만료(1일)
  disableTouch: true,                       // ★ 매 요청마다 UPDATE 막기
});
sessionStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,              // 꼭 false
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,            // HTTPS면 true
      maxAge: 24 * 60 * 60 * 1000, // ★ 쿠키 만료(1일) - store.expiration과 맞추기
    },
    // rolling: false,           // 기본값이 false (명시해도 무방)
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ───────────────────────────────────────────────
// 인증 및 API 라우터 설정
app.use("/admin", adminRouter);
app.use("/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/interests", require("./routes/interest"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/notification", require("./routes/notification"));

app.use("/schoolSchedule", require("./routes/schoolScheduleRouter"));
app.use("/averageSchedule", require("./routes/averageScheduleRouter"));
app.use("/regions", require("./routes/regionRouter"));
app.use("/mySchool", require("./routes/mySchoolRouter"));
app.use("/boards", require("./routes/boardRoute"));

app.use('/api/ai', aiRecommendRoutes);
app.use("/api/recommendations", require("./routes/recommendations"));
app.use("/api/preferences", require("./routes/preferencesRoutes"));
app.use("/api/select", require("./routes/select"));
app.use("/api/time-recommendations", require("./routes/timeRecommendations"));
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/participations", require("./routes/participationRoutes"));
app.use("/api/attendances", require("./routes/attendance"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/attachments", require("./routes/attachmentRoutes"));
app.use("/api/visions", require("./routes/visions"));
app.use("/api/admin/challenges", require("./routes/adminChallengeRoutes"));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

app.use((req, res, next) => {
    if (req.originalUrl.includes("undefined")) {
        console.warn("🚨 WARNING: undefined URL 요청 감지됨:", req.originalUrl);
    }
    next();
});

module.exports = app;
