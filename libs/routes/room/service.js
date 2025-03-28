import {roomModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";

export default class RoomService {
    /**
     * Create new room with auto-generated seats
     * @param {string} name
     * @param {number} rows
     * @param {number} seatsPerRow
     * @returns {Promise<object>}
     */
    async create(name, rows, seatsPerRow) {
        // Check for existing room with same name
        const existingRoom = await roomModel.getByQuery({name}, {});
        if (existingRoom) {
            throw errorCode(2101);
        }

        return await roomModel.create({
            name,
            rows,
            seatsPerRow
        });
    }

    /**
     * Get all rooms
     * @returns {Promise<array>}
     */
    async getAll() {
        return await roomModel.find({}, {
            name: 1,
            rows: 1,
            seatsPerRow: 1,
            createdAt: 1
        });
    }

    /**
     * Get room by ID
     * @param {string} id
     * @returns {Promise<object>}
     */
    async getById(id) {
        return await roomModel.get(id, {
            name: 1,
            rows: 1,
            seatsPerRow: 1,
            seats: 1,
            createdAt: 1
        });
    }

    /**
     * Update room details
     * @param {string} _id
     * @param {object} updates
     * @returns {Promise<object>}
     */
    async update(_id, updates) {
        // Prevent changing seats directly
        if (updates.seats) {
            delete updates.seats;
        }

        return await roomModel.update(
            {_id},
            updates,
            {new: true}
        );
    }

    /**
     * Delete a room
     * @param {string} _id
     * @returns {Promise<object>}
     */
    async delete(_id) {
        return await roomModel.delete(_id);
    }
}
