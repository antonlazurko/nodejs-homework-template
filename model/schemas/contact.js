const { version } = require('joi');
const { Schema, model, SchemaTypes } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set contact name'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Set contact email'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Set contact phone number'],
      unique: true,
    },
    subscription: {
      type: String,
      required: [true, 'Set contact phone number'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      unique: true,
    },
    token: { type: String },
    // date: { type: Date, default: () => Date.now },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);
// contactSchema.virtual('name').get(function () {
//   return this.name;
// });
const Contact = model('contact', contactSchema);

module.exports = Contact;
