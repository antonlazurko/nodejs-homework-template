// const { ObjectID } = require('mongodb');
// const db = require('../model/db');
const Contact = require('../model/schemas/contact');

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };

async function listContacts() {
  // const collection = await getCollection(db, 'contacts');
  // const results = await collection.find({}).toArray();
  const results = await Contact.find({});
  return results;
  // return db.get('contacts').value();
}
async function getById(id) {
  // const collection = await getCollection(db, 'contacts');
  // const objectId = new ObjectID(id);
  // console.log(objectId.getTimestamp());
  // const [results] = await collection.find({ _id: objectId }).toArray();
  const results = await Contact.findOne({ _id: id });
  return results;
  // return db.get('contacts').find({ id }).value();
}
async function removeContact(id) {
  // const collection = await getCollection(db, 'contacts');
  // const objectId = new ObjectID(id);
  // const { value: result } = await collection.findOneAndUpdate({
  //   _id: objectId,
  // });
  // const [record] = db.get('contacts').remove({ id }).write();
  const result = await Contact.findByIdAndRemove({ _id: id });
  return result;
}
async function addContact(body) {
  // const record = { ...body };
  // const collection = await getCollection(db, 'contacts');
  // const {
  //   ops: [result],
  // } = await collection.insertOne(record);
  // db.get('contacts').push(record).write();
  const result = await Contact.create(body);
  return result;
}
async function updateContact(id, body) {
  // const collection = await getCollection(db, 'contacts');
  // const objectId = new ObjectID(id);
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objectId },
  //   { $set: body },
  //   { returnOriginal: false },
  // );
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );
  return result;
  // const record = db.get('contacts').find({ id }).assign(body).value();
  // db.write();
  // return record.id ? record : null;
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
