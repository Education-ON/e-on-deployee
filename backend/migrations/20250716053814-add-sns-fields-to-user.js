module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'provider', {
      type: Sequelize.ENUM('local', 'kakao', 'naver', 'google'),
      allowNull: false,
      defaultValue: 'local',
    });
    await queryInterface.addColumn('User', 'sns_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'provider');
    await queryInterface.removeColumn('User', 'sns_id');
  },
};
