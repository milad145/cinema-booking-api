// libs/routes/screening/service.js
import {screeningModel, movieModel, roomModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";

export default class ScreeningService {
    async create({movieId, roomId, startTime}) {
        // Validate movie exists
        const movie = await movieModel.get(movieId);
        if (!movie) throw errorCode(404);

        // Validate room exists
        const room = await roomModel.get(roomId);
        if (!room) throw errorCode(404);

        // Calculate end time
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + movie.duration);

        // Check for overlapping screenings
        const overlapping = await screeningModel.find({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (overlapping.length > 0) {
            throw errorCode(409, "Room already booked for this time slot");
        }

        // Create screening
        return await screeningModel.create({
            movie: movieId,
            room: roomId,
            startTime,
            endTime,
            seatsAvailable: room.seats.length
        });
    }

    async getByRoom(roomId) {
        return await screeningModel.find(
            { room: roomId },
            {},
            {},
            { path: 'movie', select: 'name poster duration' }
        );
    }
}
