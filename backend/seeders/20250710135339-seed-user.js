'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashed_pw_1 = await bcrypt.hash('pw_1', 12);
    const hashed_pw_2 = await bcrypt.hash('pw_2', 12);
    const hashed_pw_3 = await bcrypt.hash('pw_3', 12);
    const hashed_pw_4 = await bcrypt.hash('pw_4', 12);
    const hashed_pw_5 = await bcrypt.hash('pw_5', 12);
    const hashed_pw_admin = await bcrypt.hash('admin_pw', 12);

    await queryInterface.bulkInsert('User', [
      { name: '김하린', age: 12, email: 'harin@example.com', pw: hashed_pw_1, type: 'student', state_code: 'active', my_school: null, email_notification: true, agreements: JSON.stringify({}) },
      { name: '박지호', age: 14, email: 'jiho@example.com', pw: hashed_pw_2, type: 'student', state_code: 'inactive', my_school: null, email_notification: false, agreements: JSON.stringify({}) },
      { name: '최수정', age: 16, email: 'sujung@example.com', pw: hashed_pw_3, type: 'student', state_code: 'active', my_school: null, email_notification: true, agreements: JSON.stringify({}) },
      { name: '이도윤', age: 33, email: 'doyoon@example.com', pw: hashed_pw_4, type: 'parent', state_code: 'active', my_school: null, email_notification: false, agreements: JSON.stringify({}) },
      { name: '정예린', age: 40, email: 'yerin@example.com', pw: hashed_pw_5, type: 'parent', state_code: 'deleted', my_school: null, email_notification: true, agreements: JSON.stringify({}) },
      { name: '관리자홍', age: 30, email: 'adminhong@example.com', pw: hashed_pw_admin, type: 'admin', state_code: 'active', my_school: null, email_notification: false, agreements: JSON.stringify({}) },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', {
      email: [
        'harin@example.com',
        'jiho@example.com',
        'sujung@example.com',
        'doyoon@example.com',
        'yerin@example.com',
        'adminhong@example.com'
      ]
    });
  }
};
