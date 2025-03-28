import Joi from 'joi';

export const createMovieValidation = Joi.object({
    name: Joi.string().required(),
    poster: Joi.string().required(),
    schedule: Joi.string().required(),
    room: Joi.string().required()
});
