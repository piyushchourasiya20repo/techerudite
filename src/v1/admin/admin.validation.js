/** Admin Validation */

/** Imports */
const Joi = require('joi');

class authValidation {

    login(params) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        return schema.validate(params);
    }

    register(params) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(3).max(50),
            password_confirmation: Joi.ref('password'),
        });
        return schema.validate(params);
    }
}

/** Exports */
module.exports = new authValidation;