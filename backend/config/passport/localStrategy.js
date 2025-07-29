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
        const user = await User.scope('withPassword').findOne({
          where: { email },
          attributes: ['user_id', 'email', 'password', 'state_code', 'type']  // 필요한 필드 명시
        });

        if (!user) {
          return done(null, false, { message: '가입되지 않은 회원입니다.' });
        }

        if (user.accountStatus === 'inactive') {
          return done(null, false, { message: '비활성화된 계정입니다.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }

        return done(null, user);
      } catch (e) {
        return done(e);
      }
    }
  ));
};
