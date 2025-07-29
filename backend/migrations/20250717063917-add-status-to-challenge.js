'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Challenge', 'status', {
      type: Sequelize.ENUM('PENDING','APPROVED','REJECTED'),
      allowNull: false,
      defaultValue: 'PENDING'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Challenge', 'status');
  }
};
