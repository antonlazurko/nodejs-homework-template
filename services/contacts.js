const Contact = require('../model/schemas/contact');

async function listContacts(
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' },
) {
  const results = await Contact.find({ owner: userId }).paginate(
    {
      owner: userId,
    },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'name email sex -_id',
      },
    },
  );
  const { docs: cats, totalDocs: total } = result;
  return { total: total.toString(), limit, offset, contacts };
}
async function getById(id, userId) {
  const results = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email sex -_id',
  });
  return results;
}
async function removeContact(id, userId) {
  const result = await Contact.findByIdAndRemove({ _id: id, owner: userId });
  return result;
}
async function addContact(body) {
  const result = await Contact.create(body);
  return result;
}
async function updateContact(id, body, userId) {
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
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
