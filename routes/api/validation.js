const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().min(1).max(9999999999).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.number().integer().min(3).max(10).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
});

function validate(schema, obj, next) {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Missing fields: ${message.replace(/"/g, '')}`,
    });
  }
}
module.exports.createContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};
module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
