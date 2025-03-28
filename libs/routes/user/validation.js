// libs/routes/user/validation.js
import Joi from 'joi';

export const registerValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(32).required()
});

export const loginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
