import Joi from 'joi';

// Validation for creating a new booking
export const createBookingValidation = Joi.object({
    screeningId: Joi.string().required(),
    seat: Joi.string().required()
        .pattern(/^[A-Z][1-9][0-9]?$/)
        .message('Seat must be in format A1, B12, etc.')
});
