const createError = require('http-errors');
const models = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');


exports.getToken = async (req, res, next) => {
    try {
        const account = await models.User.findOne({
            where: { email: req.body.email }
        });
        
        if (account) {
            const isValid = bcrypt.compareSync(req.body.password, account.password);

            if (isValid) {
                res
                    .status(200)
                    .send({
                        prefix: 'JWT',
                        access: await generateToken(account)
                    });
            }

            throw new Error('Error en los datos enviados, algo esta mal.');
        }

        throw new Error('Error en los datos enviados, algo esta mal.');
    } catch(err) {
        return next(createError(401, err.message));
    }
}