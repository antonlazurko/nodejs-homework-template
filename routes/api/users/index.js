const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/users');
const validate = require('./validation');
const guard = require('../../../helpers/guard');

router.post('/registration', usersController.reg);
router.post('/login', usersController.login);
router.post('/logout', guard, usersController.logout);

module.exports = router;
