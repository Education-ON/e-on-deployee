const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  // Local Strategy
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.scope('withPassword').findOne({
          where: { email },
          attributes: ['user_id', 'email', 'password', 'state_code', 'type']  // 명시적으로 포함
        });


        if (!user) {
          return done(null, false, { message: '가입되지 않은 회원입니다.' });
        }

        // 비활성화 계정 차단
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
