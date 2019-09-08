const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.addSecureAndGravatar = (user, options, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  const hashEmail = crypto
                          .createHash('md5')
                          .update(user.email)
                          .digest("hex");

  user.password = hashPassword;
  user.gravatar = `https://www.gravatar.com/avatar/${hashEmail}?d=retro`;
}
