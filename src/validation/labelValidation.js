const Joi = require("joi");

const labelValidation = Joi.object({
  label_result: Joi.string().required().messages({
    "any.required": "Every field must be provided",
  }),
});

module.exports = {
  labelValidation,
};
