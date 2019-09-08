const moment = require('moment');
const jwt = require('jsonwebtoken');


exports.generateToken = async ({ id, email, nickname }) => {
    return jwt.sign(
        { id, email, nickname },
        process.env.SECRET,
        { expiresIn: '12h' }
    );
}