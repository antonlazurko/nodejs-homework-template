const User = require('../model/schemas/user');
const findByEmail = async email => {
  return User.findOne({ email });
};
const findById = async _id => {
  return User.findOne({ _id });
};
const create = async ({ name, email, password, sex }) => {
  const user = new User({ name, email, password, sex });
  return await user.save();
};
const updateToken = async (_id, token) => {
  return User.updateOne({ _id: id }, { token });
};
module.exports = { findByEmail, create, findById, updateToken };
