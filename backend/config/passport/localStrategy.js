const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../../models');
const User = db.User;

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',        // 로그인 폼에서 이메일 입력 필드
      passwordField: 'password',     // 로그인 폼에서 비밀번호 입력 필드
    },
    async (email, password, done) => {
      try {
        // password 필드(pw)는 별도 명시적으로 지정
        const user = await User.findOne({
          where: { email },
          attributes: ['user_id', 'email', 'pw', 'state_code', 'type', 'provider']
        });

        if (!user) {
          return done(null, false, { message: '가입되지 않은 회원입니다.' });
        }

        user.password = user.pw;

        // 비밀번호가 없는 경우 → 소셜 로그인 계정
        if (!user.pw) {
          return done(null, false, {
            message: '소셜 로그인 계정입니다. 해당 로그인 버튼을 이용해주세요.'
          });
        }

        // 상태 확인
        if (user.state_code === 'inactive') {
          return done(null, false, { message: '비활성화된 계정입니다.' });
        }

        const match = await bcrypt.compare(password, user.pw);
        if (!match) {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};
