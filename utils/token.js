const config = require('../config/config.json');
const moment = require('moment');
const jwt = require('jsonwebtoken');


exports.generateToken = async ({ id, email, nickname }) => {
    return jwt.sign(
        { id, email, nickname },
        config.secret,
        { expiresIn: '12h' }
    );
}