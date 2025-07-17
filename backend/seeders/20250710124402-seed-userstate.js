'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserState', [
      { state_code: 'active', state_description: '활성화된 사용자 계정' },
      { state_code: 'inactive', state_description: '휴면 상태의 사용자 계정' },
      { state_code: 'suspended', state_description: '이용 정지 상태' },
      { state_code: 'deleted', state_description: '탈퇴한 사용자 계정' },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserState', {
      state_code: ['active', 'inactive', 'suspended', 'deleted']
    });
  }
};
