const Joi = require('joi');

const labelValidation = Joi.object({
    label: Joi.string().required().message({
        "any.required": "Smeua field wajib diisi"
    })
});

module.exports = {
    labelValidation
};