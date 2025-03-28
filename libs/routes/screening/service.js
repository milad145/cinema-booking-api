import {screeningModel, movieModel, roomModel, bookingModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";

export default class ScreeningService {
    /**
     * Create new screening with time conflict check
     * @param {object} screeningData - Screening details
     * @returns {Promise<object>} Created screening
     */
    async create(screeningData) {
        // Validate movie exists
        const movie = await movieModel.get(screeningData.movieId);
        if (!movie) throw errorCode(2202);

        // Validate room exists
        const room = await roomModel.get(screeningData.roomId);
        if (!room) throw errorCode(2102);

        // Calculate end time
        const now = new Date();
        const startTime = new Date(screeningData.startTime);
        const endTime = new Date(startTime.getTime() + movie.duration * 60000);
        if (startTime < now)
            throw errorCode(2303)
        // Check for overlapping screenings in the same room
        const overlapping = await screeningModel.find({
            room: screeningData.roomId,
            $or: [
                {startTime: {$lt: endTime}, endTime: {$gt: startTime}}
            ]
        });

        if (overlapping.length > 0) {
            throw errorCode(2302);
        }

        // Create screening
        return await screeningModel.create({
            movie: screeningData.movieId,
            room: screeningData.roomId,
            startTime: startTime,
            endTime: endTime
        });
    }

    /**
     * Get all screenings with movie and room details
     * @returns {Promise<array>} List of screenings
     */
    async getAll() {
        return await screeningModel.find(
            {},
            {movie: 1, room: 1, startTime: 1, endTime: 1, createdAt: 1},
            {sort: {startTime: 1}},
            [
                {path: 'movie', select: 'name poster duration'},
                {path: 'room', select: 'name'}
            ]
        );
    }

    /**
     * Get screenings for a specific movie
     * @param {string} movieId - Movie ID
     * @returns {Promise<array>} List of screenings
     */
    async getByMovie(movieId) {
        return await screeningModel.find(
            {movie: movieId},
            {},
            {sort: {startTime: 1}},
            [
                {path: 'room', select: 'name'},
                {path: 'movie', select: 'name'}
            ]
        );
    }

    /**
     * Get screenings for a specific room
     * @param {string} roomId - Room ID
     * @returns {Promise<array>} List of screenings
     */
    async getByRoom(roomId) {
        return await screeningModel.find(
            {room: roomId},
            {},
            {sort: {startTime: 1}},
            [
                {path: 'movie', select: 'name poster duration'},
                {path: 'room', select: 'name'}
            ]
        );
    }

    /**
     * Get screening by ID
     * @param {string} id - Screening ID
     * @returns {Promise<object|null>} Screening details
     */
    async getById(id) {
        let screening = await screeningModel.get(
            id,
            {},
            [
                {path: 'movie', select: 'name poster duration description'},
                {path: 'room', select: 'name seats'},
            ]
        );
        let bookedSeats = await bookingModel.find({
            screening: id,
            status: {$ne: "cancelled"}
        }, {seat: 1})

        screening['_doc'].reservedSeats = bookedSeats.map(book => book.seat)

        return screening
    }

    /**
     * Update screening details
     * @param {string} id - Screening ID
     * @param {object} updates - Fields to update
     * @returns {Promise<object|null>} Updated screening
     */
    async update(id, updates) {
        // If changing time, validate no conflicts
        if (updates.startTime) {
            const screening = await screeningModel.get(id, {movie: 1, room: 1});
            if (!screening) throw errorCode(2301);

            const movie = await movieModel.get(screening.movie);
            if (!movie) throw errorCode(2202);

            const now = new Date();
            const startTime = new Date(updates.startTime);
            const endTime = new Date(startTime.getTime() + movie.duration * 60000);
            if (startTime < now)
                throw errorCode(2303)

            const overlapping = await screeningModel.find({
                room: updates.roomId || screening.room,
                _id: {$ne: id},
                $or: [
                    {startTime: {$lt: endTime}, endTime: {$gt: startTime}}
                ]
            });

            if (overlapping.length > 0) {
                throw errorCode(2302);
            }

            updates.endTime = endTime;
        }

        return await screeningModel.update(
            {_id: id},
            updates,
            {new: true}
        );
    }

    /**
     * Delete a screening
     * @param {string} id - Screening ID
     * @returns {Promise<object|null>} Deleted screening
     */
    async delete(id) {
        return await screeningModel.delete(id);
    }
}
