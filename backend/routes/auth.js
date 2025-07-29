const express = require('express');
const passport = require('passport');
const router = express.Router();

const authCtrl = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

console.log('✅ [auth.js] 라우터 로딩됨');
console.log('🔍 [auth.js] passport 타입:', typeof passport);
console.trace('🔎 [auth.js] passport 호출 위치 추적');

// ────────────── 회원가입 관련 ──────────────
router.post('/join/step1', isNotLoggedIn, authCtrl.signupStep1);
router.post('/join/step2', isNotLoggedIn, authCtrl.signupStep2);
router.post('/join/email', isNotLoggedIn, authCtrl.sendEmailCode);
router.post('/verify-email', isNotLoggedIn, authCtrl.verifyEmailCode);
router.post('/join/step3', isNotLoggedIn, authCtrl.signupStep3);

// ────────────── 로그인 / 로그아웃 ──────────────
router.post('/login', isNotLoggedIn, authCtrl.login);
router.post('/logout', isLoggedIn, authCtrl.logout);

// ────────────── 카카오 로그인 ──────────────
router.get('/kakao', (req, res, next) => {
  console.log('🟡 [/auth/kakao] 카카오 로그인 시작 요청');
  console.log('🔍 passport 타입 (카카오 라우트 내):', typeof passport);
  console.trace('🔎 passport.authenticate 호출 위치 추적');
  return passport.authenticate('kakao')(req, res, next);
});

router.get('/kakao/callback', (req, res, next) => {
  passport.authenticate('kakao', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    if (user.isNewSocialUser) {
      req.session.socialUser = {
        provider: user.provider,
        sns_id: user.sns_id,
        email: user.email,
      };
      return res.redirect(`${process.env.FRONTEND_URL}/social-login`);
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect(`${process.env.FRONTEND_URL}/`);
    });
  })(req, res, next);
});

// ────────────── 소셜 유저 세션 조회 ──────────────
router.get('/social-session', (req, res) => {
  if (!req.session.socialUser) {
    return res.status(404).json({ message: '세션 없음' });
  }
  res.json(req.session.socialUser);
});

// ────────────── 소셜 유저 추가 정보 입력 ──────────────
router.post('/social-signup', authCtrl.socialSignup);

// --- 리디렉트 방지 라우터 추가 ---
router.get('kakao/undefined/social-singup', (req,res) => {
  return res.redirect('${process.env.FRONTEND_URL}/social-signup');
});

console.log('🌐 process.env.FRONTEND_URL:', process.env.FRONTEND_URL);

module.exports = router;
