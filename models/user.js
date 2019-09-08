const { addSecureAndGravatar } = require('../utils/user');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    gravatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'El email ingresado ya esta en uso, intentelo mas tarde.'
      },
      validate: {
        isEmail: true
      }
    },
    nickname: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'El nickname ingresado ya esta en uso, intentelo mas tarde.'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        len: [8, 100]
      }
    }
  }, {
    hooks: {
      beforeCreate: addSecureAndGravatar,
      beforeUpdate: addSecureAndGravatar
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Image, {
      as: 'posts'
    });
  };

  return User;
};