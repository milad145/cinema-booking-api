import Joi from 'joi';

// Validation for creating a new screening
export const createScreeningValidation = Joi.object({
    movieId: Joi.string().required(),
    roomId: Joi.string().required(),
    startTime: Joi.date().iso().required()
        .description('Start time in ISO format')
});

// Validation for updating a screening
export const updateScreeningValidation = Joi.object({
    movieId: Joi.string(),
    roomId: Joi.string(),
    startTime: Joi.date().iso()
        .description('Start time in ISO format')
}).min(1); // At least one field required for update
