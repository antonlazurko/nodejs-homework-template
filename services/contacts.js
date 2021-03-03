const Contact = require('../model/schemas/contact');

async function listContacts() {
  const results = await Contact.find({});
  return results;
}
async function getById(id) {
  const results = await Contact.findOne({ _id: id });
  return results;
}
async function removeContact(id) {
  const result = await Contact.findByIdAndRemove({ _id: id });
  return result;
}
async function addContact(body) {
  const result = await Contact.create(body);
  return result;
}
async function updateContact(id, body) {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );
  return result;
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
