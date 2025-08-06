module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostImages", {
      image_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Post",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("PostImages");
  },
};
