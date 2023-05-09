const Joi = require("joi");

const labelValidation = Joi.object({
  label_result: Joi.string().required().messages({
    "any.required": "Semua field wajib diisi",
  }),
});

module.exports = {
  labelValidation,
};
