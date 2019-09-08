const express = require('express');
const verify = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/image.middleware');
const controllers = require('../controllers/image.controller');

const router = express.Router();

router.post('/posts', verify, upload.single('image'), controllers.uploadPost);
router.get('/posts', controllers.allPosts);

module.exports = router;