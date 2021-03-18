const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/users');
const validate = require('./validation');
const guard = require('../../../helpers/guard');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');
router.post('/registration', createAccountLimiter, usersController.reg);
router.post('/login', usersController.login);
router.post('/logout', guard, usersController.logout);

module.exports = router;
