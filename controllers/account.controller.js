const models = require('../models');
const createError = require('http-errors');


exports.register = async (req, res) => {
    try {
        const account = await models.User.create({
            nickname: req.body.nickname,
            email: req.body.email,
            password: req.body.password
        });
    
        res
            .status(201)
            .send({
                data: account
            });
    } catch(err) {
        res
            .status(400)
            .send({
                errorStatus: 400,
                error: 'Validatio error',
                message: err.message
            });
    }
}

exports.allAccounts = async (req, res) => {
    const accounts = await models.User.findAll();

    res
        .status(200)
        .send({
            data_length: accounts.length,
            data: accounts,
            next: null,
            prev: null
        });
}

exports.accountInfo = async (req, res, next) => {
    try {
        const account = await models.User.findOne({
            where: { nickname: req.params.nickname },
            include: [
                { model: models.Image, as: 'posts' }
            ]
        });
    
        if (account) {
            res
                .status(200)
                .send({
                    data: account
                });
        }
        console.log('Zqui');
    
        return next(createError(404));
    } catch(err) {
        return next(createError(404));
    }
}