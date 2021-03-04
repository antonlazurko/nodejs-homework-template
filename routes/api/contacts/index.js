const express = require('express');
const router = express.Router();
const url = require('url');
const contactsController = require('../../../controllers/contacts');
const validate = require('./validation');

const guard = require('../../../helpers/guard');
router
  .get('/', guard, contactsController.getAll)
  .post('/', guard, validate.createContact, contactsController.create);

router
  .get('/:id', guard, contactsController.getById)
  .delete('/:id', guard, contactsController.remove)
  .patch('/:id', guard, validate.updateContact, contactsController.update);

module.exports = router;
