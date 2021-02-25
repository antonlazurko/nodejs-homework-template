const db = require('../model/db');
const fs = require('fs').promises;
const path = require('path');
// const { v4: uuidv4 } = require('uuid');

// const contactsPath = path.join(__dirname, '..', 'contacts.json');

async function listContacts() {
  return db.get('contacts').value();
}
async function getById(id) {
  return db.get('contacts').find({ id }).value();
}
async function removeContact(id) {
  const [record] = db.get('contacts').remove({ id }).write();
  return record;
}
async function addContact(body) {
  const id = uuidv4();
  const record = { id, ...body };
  db.get('contacts').push(record).write();
  return record;
}
async function updateContact(id, body) {
  const record = db.get('contacts').find({ id }).assign(body).value();
  db.write();
  return record.id ? record : null;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     const contacts = JSON.parse(data);
//     return contacts;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getContactById(contactId) {
//   try {
//     const contact = await listContacts().then(contacts =>
//       contacts.find(contact => `${contact.id}` === contactId),
//     );
//     if (contact) {
//       return contact;
//     }
//     throw new Error();
//   } catch (error) {
//     console.log(`There is no contact with ${contactId} id`);
//     return error;
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const contacts = await listContacts().then(contacts =>
//       contacts.map(contact => contact),
//     );
//     const filterdContacts = await listContacts().then(contacts =>
//       contacts.filter(contact => contact.id !== contactId),
//     );
//     if (contacts.length === filterdContacts.length) {
//       return console.log(`There is no contact with "${contactId}" id`);
//     }
//     await fs.writeFile(contactsPath, JSON.stringify(filterdContacts));
//     console.log(`Contact with id "${contactId}" successfully delete`);
//     return console.table(await listContacts());
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function addContact(name, email, phone) {
//   const uId = uuidv4();
//   const newContact = { id: uId, name: name, email: email, phone: phone };
//   try {
//     const contacts = await listContacts().then(contacts =>
//       contacts.map(contact => contact),
//     );
//     if (contacts.find(contact => contact.name === newContact.name)) {
//       console.log('This contact is available');
//       return;
//     }
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//     console.log('This contact is successfully added');
//     return console.table(await listContacts());
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = { addContact, removeContact, listContacts, getContactById };
