import express from 'express';

import MovieService from './service.js';
import {createMovieValidation, updateMovieValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isAdmin, isLogin} from "../../middlewares/index.js";

const movieService = new MovieService;

const router = express.Router();

//======================================= POST =======================================//

// Create new movie (Admin only)
router.post("/", isLogin, isAdmin, async (req, res) => {
    const {error} = createMovieValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const movie = await movieService.create(req.body);
        res.status(201).json({
            movie: {
                _id: movie._id,
                name: movie.name,
                poster: movie.poster,
                duration: movie.duration,
                description: movie.description
            }
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= GET =======================================//

// Get all movies
router.get("/", async (req, res) => {
    try {
        const movies = await movieService.getAll();
        res.json({
            count: movies.length,
            movies: movies
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get single movie by ID
router.get("/:id", async (req, res) => {
    try {
        const movie = await movieService.getById(req.params.id);
        if (!movie) {
            return setErrorResponse(req, res, errorCode(2202));
        }
        res.json({movie});
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= PUT =======================================//

// Update movie (Admin only)
router.put("/:id", isLogin, isAdmin, async (req, res) => {
    const {error} = updateMovieValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const updatedMovie = await movieService.update(
            req.params.id,
            req.body
        );
        if (!updatedMovie) {
            return setErrorResponse(req, res, errorCode(2202));
        }
        res.json({
            movie: updatedMovie
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= DELETE =======================================//

// Delete movie (Admin only)
router.delete("/:id", isLogin, isAdmin, async (req, res) => {
    try {
        const deletedMovie = await movieService.delete(req.params.id);
        if (!deletedMovie) {
            return setErrorResponse(req, res, errorCode(2202));
        }
        res.json({
            message: `Movie deleted successfully`
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
