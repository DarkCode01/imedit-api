const fs = require('fs');
const models = require('../models');
const createError = require('http-errors');
const cloudinary = require('cloudinary').v2;
const config = require('../config/cloudinary.config');

// initializate cloudinary
cloudinary.config(config);

exports.uploadPost = async (req, res, next) => {
    try {
        const uploaded = await cloudinary.uploader.upload(req.file.path);
        const removed = fs.unlinkSync(req.file.path);
        const post = await models.Image.create({
            ...uploaded,
            title: req.body.title,
            url: uploaded.url,
            UserId: req.user.id,
            originalFilename: uploaded.original_filename,
            publicId: uploaded.public_id
        });

        res
            .status(200)
            .send({
                data: null
            });
    } catch(err) {
        console.log(err)
        return next(createError(500, err.message));
    }
}

exports.allPosts = async (req, res, next) => {
    try {
        const posts = await models.Image.findAll({
            attributes: {
                exclude: ['UserId', 'updatedAt']
            },
            include: [
                {
                    model: models.User,
                    attributes: {
                        exclude: ['password', 'email', 'createdAt', 'updatedAt']
                    }
                }
            ]
        });

        res
            .status(200)
            .send({
                next: null,
                prev: null,
                data_length: posts.length,
                data: posts
            });
    } catch(err) {
        return next(createError(500, err.message));
    }
}