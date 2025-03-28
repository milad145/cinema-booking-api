// libs/routes/screening/validation.js
import Joi from 'joi';

export const createScreeningValidation = Joi.object({
    movieId: Joi.string().required(),
    roomId: Joi.string().required(),
    startTime: Joi.date().required()
});
