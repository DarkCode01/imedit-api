const { hashPassword } = require('../utils/password');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Image, {
      as: 'posts'
    });
  };

  return User;
};