import {movieModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";
//========================
export default class MovieService {
    /**
     * Create new room
     * @param name {string}
     * @param poster {string}
     * @param schedule {string}
     * @param room {objectID}
     * @returns {Promise<object>}
     */
    async create(name, poster, schedule, room) {
        let movie = await movieModel.getByQuery({name}, {})
        if (movie) {
            throw errorCode(2201)
        }

        let movieObj = {name, poster, schedule, room}
        return await movieModel.create(movieObj);
    }

    /**
     * Get rooms list
     * @returns {Promise<array>}
     */
    async getMovies() {
        return await movieModel.find({}, {name: 1, poster: 1}, {}, {
            path: 'room',
            select: 'name'
        })
    }

    /**
     * Get room by id
     * @param _id {objectID}
     * @returns {Promise<object>}
     */
    async getMovie(_id) {
        return await movieModel.get(_id, {name: 1, poster: 1, schedule: 1, room: 1}, {
            path: 'room',
            select: 'name seats'
        })
    }
}
