const express = require('express');
const router = express.Router();
const url = require('url');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('../../services/services.js');

// router.get('/', async (req, res, next) => {
//   try {
//     let data = await listContacts();
//     res.status(200).json({ message: data });
//   } catch (e) {
//     next(e);
//   }
// });

router.get('/', async (req, res, next) => {
  try {
    let data = await listContacts();
    res.render('contacts', {
      title: 'Contacts',
      contacts: data,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { pathname } = url.parse(req.url);
  let contactId = pathname.substring(1);
  try {
    let data = await getContactById(contactId);
    console.log(data);
    if (data === {}) {
      res.render('contact', {
        title: 'Contact',
        contact: data,
      });
    }
    next();
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
