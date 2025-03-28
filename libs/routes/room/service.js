import {roomModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";
//========================
export default class RoomService {
    /**
     * Create new room
     * @param name {string}
     * @param seats {array}
     * @returns {Promise<object>}
     */
    async create(name, seats) {
        let room = await roomModel.getByQuery({name}, {})
        if (room) {
            throw errorCode(2101)
        }

        let roomObj = {name, seats}

        return await roomModel.create(roomObj);
    }

    /**
     * Get rooms list
     * @returns {Promise<array>}
     */
    async getRooms() {
        return await roomModel.find({}, {name: 1})
    }

    /**
     * Get room by id
     * @param _id {objectID}
     * @returns {Promise<object>}
     */
    async getRoom(_id) {
        return await roomModel.get(_id, {name: 1, seats: 1})
    }
}
