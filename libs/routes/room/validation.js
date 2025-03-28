import Joi from 'joi';

// Validation for creating a new room
export const createRoomValidation = Joi.object({
    name: Joi.string().required().max(50),
    rows: Joi.number().integer().min(1).max(26).required()
        .description('Number of rows (1-26)'),
    seatsPerRow: Joi.number().integer().min(1).max(50).required()
        .description('Number of seats per row (1-50)')
});

// Validation for updating a room
export const updateRoomValidation = Joi.object({
    name: Joi.string().max(50),
    rows: Joi.number().integer().min(1).max(26)
        .description('Number of rows (1-26)'),
    seatsPerRow: Joi.number().integer().min(1).max(50)
        .description('Number of seats per row (1-50)')
}).min(1); // At least one field required for update
