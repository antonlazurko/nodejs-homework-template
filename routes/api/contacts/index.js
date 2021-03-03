const express = require('express');
const router = express.Router();
const url = require('url');
const contactsController = require('../../../controllers/contacts');

const validate = require('./validation');

router
  .get('/', contactsController.getAll)
  .post('/', validate.createContact, contactsController.create);

router
  .get('/:id', contactsController.getById)
  .delete('/:id', contactsController.remove)
  .patch('/:id', validate.updateContact, contactsController.update);

module.exports = router;
