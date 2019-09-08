const express = require('express');
const verify = require('../middlewares/auth.middleware');
const controllers = require('../controllers/account.controller');

const router = express.Router();

router.get('/accounts/@:nickname', controllers.accountInfo);
router.get('/accounts', controllers.allAccounts);
router.post('/accounts', controllers.register);
router.patch('/accounts/@:nickname', verify, controllers.updateAccount)

module.exports = router;