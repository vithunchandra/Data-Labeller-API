const Joi = require("joi").extend(require("@joi/date"));

const taskValidation = Joi.object({
  type_id: Joi.string().required().messages({
    "any.required": "Semua field wajib diisi",
  }),
  max_labeller: Joi.number().greater(0).required().messages({
    "any.required": "Semua field wajib diisi",
    "number.greater": "max_labeller harus lebih besar dari 0",
  }),
  close_date: Joi.date().format("YYYY-MM-DD").required().messages({
    "any.required": "Semua field wajib diisi",
  }),
  minimal_credibility: Joi.number().greater(-1).less(101).required().messages({
    "any.required": "Semua field wajib diisi",
    "number.greater": "minimal_credibility harus lebih besar dari 0",
    "number.less": "minimal_credibility harus kurang dari sama dengan 100",
  }),
  possible_class: Joi.array().optional(),
});

module.exports = {
  taskValidation,
};
