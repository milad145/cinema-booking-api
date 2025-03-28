import Joi from 'joi';

export const createRoomValidation = Joi.object({
    name: Joi.string().required(),
    seats: Joi.array().required()
});
