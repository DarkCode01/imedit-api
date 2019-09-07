const createError = require('http-errors');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const [ tokenType, token ] = req.headers.authorization.split(' ');
            const payload = jwt.verify(token, config.secret);

            if (tokenType == 'JWT' && payload) {
                req.user = payload;

                return next();
            }
        } else {
            throw new Error('Forbidden')
        }
    } catch(err) {
        return next(createError(403, err.message));
    }
}