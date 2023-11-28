const Joi = require("@hapi/joi");

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    description: Joi.string().required(),
    DOB:Joi.string().required(),
    Experience:Joi.string().required()
});

module.exports = { userSchema };