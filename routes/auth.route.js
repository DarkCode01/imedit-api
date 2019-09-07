const controllers = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/token', controllers.getToken);


module.exports = router;