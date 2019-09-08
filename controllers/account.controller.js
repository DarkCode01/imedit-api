const models = require('../models');
const createError = require('http-errors');
const { generateToken } = require('../utils/token');


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
                prefix: 'JWT',
                access: await generateToken(account)
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
    const accounts = await models.User.findAll({
        attributes: {
            exclude: ['password']
        }
    });

    res
        .status(200)
        .send({
            next: null,
            prev: null,
            data_length: accounts.length,
            data: accounts
        });
}

exports.accountInfo = async (req, res, next) => {
    try {
        const account = await models.User.findOne({
            where: { nickname: req.params.nickname },
            attributes: {
                exclude: ['password']
            },
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

exports.updateAccount = async (req, res, next) => {
    try {
        console.log(req.params)
        const account = await models.User.update(
            req.body,
            { where: { id: req.user.id, nickname: req.params.nickname  } }
        );

        if (account[0]) {
            res
                .status(200)
                .send({
                    updated: true
                });
        } else {
            throw new Error('Error actualizando la cuenta, intentelo mas tarde.')
        }
    } catch(err) {
        return next(createError(500), err.message);
    }
}