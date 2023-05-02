const Joi = require("joi");

const labelValidation = Joi.object({
  label: Joi.string().required().messages({
    "any.required": "Semua field wajib diisi",
  }),
});

module.exports = {
  labelValidation,
};
