const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { Sex } = require('../../helpers/constans');
const SALT_WORK_FACTOR = 8;
const userSchema = new Schema(
  {
    name: {
      type: String,
      minlengh: 3,
      required: [true, 'Set user name'],
      default: 'Guest',
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    sex: {
      type: String,
      enum: { values: [Sex.MALE, Sex.FAMALE, Sex.NONE] },
      message: "It isn't alowed",
      default: Sex.NONE,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: { type: String, required: [true, 'verify token required'] },
  },
  { versionKey: false, timestamps: true },
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});
userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;
