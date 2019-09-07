const controllers = require('../controllers/account.controller');
const express = require('express');

const router = express.Router();

router.get('/accounts', controllers.allAccounts);
router.get('/accounts/@:nickname', controllers.accountInfo);
router.post('/accounts', controllers.register);

module.exports = router;