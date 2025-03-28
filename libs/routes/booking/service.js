import {bookingModel, screeningModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";

export default class BookingService {
    /**
     * Create new booking
     * @param {object} bookingData - Booking details
     * @returns {Promise<object>} Created booking
     */
    async create({screeningId, seat, userId}) {
        // Validate screening exists
        const screening = await screeningModel.get(screeningId, {}, [
            {path: 'room', select: 'seats'},
            {path: 'movie', select: 'duration'}
        ]);
        if (!screening) throw errorCode(2301);

        // Validate seat exists in room
        if (!screening.room.seats.includes(seat)) {
            throw errorCode(2402);
        }
        if(new Date(screening.startTime) < new Date())
            throw errorCode(2405)

        // Check if seat is already booked
        const existingBooking = await bookingModel.getByQuery({
            screening: screeningId,
            seat,
            status: {$ne: 'cancelled'}
        });
        if (existingBooking) {
            throw errorCode(2403);
        }

        // Create booking
        return await bookingModel.create({
            screening: screeningId,
            seat,
            user: userId,
            status: 'confirmed'
        });
    }

    /**
     * Get bookings for a specific user
     * @param {string} userId - User ID
     * @returns {Promise<array>} List of bookings
     */
    async getUserBookings(userId) {
        return bookingModel.find(
            {user: userId, status: 'confirmed'},
            {screening: 1, seat: 1, user: 1, status: 1, createdAt: 1},
            {},
            [
                {
                    path: 'screening',
                    select: 'movie room startTime',
                    populate: [
                        {path: 'movie', select: 'name poster'},
                        {path: 'room', select: 'name'}
                    ]
                }
            ]
        );
    }

    /**
     * Get booking by ID
     * @param {string} id - Booking ID
     * @returns {Promise<object|null>} Booking details
     */
    async getById(id) {
        return bookingModel.get(
            id,
            {},
            [
                {
                    path: 'screening',
                    populate: [
                        {path: 'movie', select: 'name poster duration'},
                        {path: 'room', select: 'name'}
                    ]
                },
                {path: 'user', select: 'username'}
            ]
        );
    }

    /**
     * Cancel a booking
     * @param {string} id - Booking ID
     * @param {string} userId - User ID for verification
     * @returns {Promise<object|null>} Cancelled booking
     */
    async cancel(id, userId) {
        // Verify booking belongs to user
        const booking = await bookingModel.get(id);
        if (!booking) throw errorCode(2401);
        if (booking.user.toString() !== userId.toString()) {
            throw errorCode(2404);
        }

        // Update status to cancelled
        return bookingModel.update(
            {_id: id},
            {status: 'cancelled'},
            {new: true}
        );
    }
}
