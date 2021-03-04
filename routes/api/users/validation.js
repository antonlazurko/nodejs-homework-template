const Joi = require('joi');

const schemaAddUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});
const schemaUpdateUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.number().optional(),
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
module.exports.createUser = (req, res, next) => {
  return validate(schemaAddUser, req.body, next);
};
module.exports.updateUser = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};
