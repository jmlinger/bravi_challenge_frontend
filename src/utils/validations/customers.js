const Joi = require('joi');

const customerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  address: Joi.string().min(10).required(),
  phone: Joi.string()
    .allow('')
    .required()
    .length(11)
    .pattern(/^[0-9]+$/),
  whatsapp: Joi.string()
    .allow('')
    .required()
    .length(12)
    .pattern(/^[0-9]+$/),
  socialMediaLink: Joi.string().allow('').required().uri()
});

const validationError = (customer) => customerSchema.validate(customer).error;

module.exports = {
  custValidation: (customer) => validationError(customer)
};
