module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define("PostImage", {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  PostImage.associate = (models) => {
    PostImage.belongsTo(models.Post, {
      foreignKey: "post_id",
      onDelete: "CASCADE",
    });
  };

  return PostImage;
};
