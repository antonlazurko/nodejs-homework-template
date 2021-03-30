const User = require('../model/schemas/user');
const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password, verify, verifyToken }) => {
  const user = new User({ email, password, verify, verifyToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const findByVerifyToken = async verifyToken => {
  return await User.findOneAndUpdate({ verifyToken });
};
const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};
module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByVerifyToken,
  updateVerifyToken,
};
