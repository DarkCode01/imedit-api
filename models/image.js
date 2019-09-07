module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    title: DataTypes.STRING
  }, {});

  Image.associate = function(models) {
    Image.belongsTo(models.User, {
      foreignKey: 'id'
    });
  };

  return Image;
};