import Joi from 'joi';

// Validation for creating a new movie
export const createMovieValidation = Joi.object({
    name: Joi.string().required().max(100),
    poster: Joi.string().uri().required(),
    duration: Joi.number().integer().min(1).max(300).required()
        .description('Duration in minutes (1-300)'),
    description: Joi.string().max(1000).optional()
});

// Validation for updating a movie
export const updateMovieValidation = Joi.object({
    name: Joi.string().max(100),
    poster: Joi.string().uri(),
    duration: Joi.number().integer().min(1).max(300)
        .description('Duration in minutes (1-300)'),
    description: Joi.string().max(1000)
}).min(1); // At least one field required for update
