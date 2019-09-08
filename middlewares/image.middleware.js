const createError = require('http-errors');
const multer = require('multer');
const mimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg'
];

exports.upload = multer({
    dest: './temp/uploads',
    limits: 1000000, // 1mb
    fileFilter: (req, file, next) => {
        if (mimeTypes.includes(file.mimetype)) {
            return next(null, true);
        }

        return next(
            createError(406, "MimeType of file is not acceptable (PNG, JPG, JPEG)."),
            false
        );
    }
});