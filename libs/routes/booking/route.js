import express from 'express';
import BookingService from './service.js';
import { createBookingValidation } from "./validation.js";
import { setErrorResponse } from "../../modules/assist.js";
import { errorCode } from "../../modules/errorHandler.js";
import { isLogin } from "../../middlewares/index.js";

const bookingService = new BookingService();

const router = express.Router();

//======================================= POST =======================================//

// Book a seat (User only)
router.post("/", isLogin, async (req, res) => {
    const { error } = createBookingValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const booking = await bookingService.create({
            ...req.body,
            userId: req.user._id
        });
        res.json({
            booking: {
                _id: booking._id,
                screening: booking.screening,
                seat: booking.seat,
                user: booking.user,
                status: booking.status
            }
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= GET =======================================//

// Get user's bookings
router.get("/mine", isLogin, async (req, res) => {
    try {
        const bookings = await bookingService.getUserBookings(req.user._id);
        res.json({
            count: bookings.length,
            bookings
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get booking details
router.get("/:id", isLogin, async (req, res) => {
    try {
        const booking = await bookingService.getById(req.params.id);
        if (!booking) {
            return setErrorResponse(req, res, errorCode(404));
        }
        res.json({
            booking
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= DELETE =======================================//

// Cancel booking (User only)
router.delete("/:id", isLogin, async (req, res) => {
    try {
        const deletedBooking = await bookingService.cancel(
            req.params.id,
            req.user._id
        );
        if (!deletedBooking) {
            return setErrorResponse(req, res, errorCode(404));
        }
        res.json({
            message: "Booking cancelled successfully"
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
