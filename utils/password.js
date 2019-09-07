const bcrypt = require('bcrypt');

exports.hashPassword = (user, options, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
}
