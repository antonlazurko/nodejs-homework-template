const express = require('express');
const router = express.Router();
const url = require('url');

const Contacts = require('../../services/services');
const validate = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    // res.render('contacts', {
    //   title: 'Contacts',
    //   contacts,
    // });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id);
    // res.render('contacts', {
    //   title: 'Contacts',
    //   contacts,
    // });
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    // res.render('contacts', {
    //   title: 'Contacts',
    //   contacts,
    // });
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', validate.updateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body);
    // res.render('contacts', {
    //   title: 'Contacts',
    //   contacts,
    // });
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
