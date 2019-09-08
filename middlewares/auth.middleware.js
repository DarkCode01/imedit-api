const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const [ tokenType, token ] = req.headers.authorization.split(' ');
            const payload = jwt.verify(token, process.env.SECRET);

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