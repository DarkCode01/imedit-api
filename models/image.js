module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    publicId: { type: DataTypes.STRING },
    signature: { type: DataTypes.STRING },
    originalFilename: { type: DataTypes.STRING },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    title: {
      type: DataTypes.STRING
    },
    width: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER }
  }, {});

  Image.associate = function(models) {
    Image.belongsTo(models.User);
  };

  return Image;
};