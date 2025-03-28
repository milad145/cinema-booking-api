import {movieModel} from "../../database/index.js";
import {errorCode} from "../../modules/errorHandler.js";

export default class MovieService {
    /**
     * Create new movie
     * @param {object} movieData - Movie details
     * @returns {Promise<object>} Created movie
     */
    async create(movieData) {
        // Check for existing movie with same name
        const existingMovie = await movieModel.getByQuery(
            {name: movieData.name},
            {}
        );
        if (existingMovie) {
            throw errorCode(2201); // Duplicate movie name error
        }

        return await movieModel.create(movieData);
    }

    /**
     * Get all movies
     * @returns {Promise<array>} List of movies
     */
    async getAll() {
        return await movieModel.find(
            {},
            {
                name: 1,
                poster: 1,
                duration: 1,
                description: 1,
                createdAt: 1
            },
            {sort: {name: 1}}
        );
    }

    /**
     * Get movie by ID
     * @param {string} id - Movie ID
     * @returns {Promise<object|null>} Movie details
     */
    async getById(id) {
        return await movieModel.get(id, {
            name: 1,
            poster: 1,
            duration: 1,
            description: 1,
            createdAt: 1
        });
    }

    /**
     * Update movie details
     * @param {string} id - Movie ID
     * @param {object} updates - Fields to update
     * @returns {Promise<object|null>} Updated movie
     */
    async update(id, updates) {
        // If name is being updated, check for conflicts
        if (updates.name) {
            const existingMovie = await movieModel.getByQuery(
                {name: updates.name, _id: {$ne: id}},
                {}
            );
            if (existingMovie) {
                throw errorCode(2201); // Duplicate movie name error
            }
        }

        return await movieModel.update(
            {_id: id},
            updates,
            {new: true}
        );
    }

    /**
     * Delete a movie
     * @param {string} id - Movie ID
     * @returns {Promise<object|null>} Deleted movie
     */
    async delete(id) {
        return await movieModel.delete(id);
    }
}
