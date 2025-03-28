import express from 'express';

import ScreeningService from './service.js';
import {createScreeningValidation, updateScreeningValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isAdmin, isLogin} from "../../middlewares/index.js";

const screeningService = new ScreeningService();

const router = express.Router();

//======================================= POST =======================================//
// Create new screening (Admin only)
router.post("/", isLogin, isAdmin, async (req, res) => {
    const {error} = createScreeningValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const screening = await screeningService.create(req.body);
        res.json({
            screening: {
                _id: screening._id,
                movie: screening.movie,
                room: screening.room,
                startTime: screening.startTime,
                endTime: screening.endTime
            }
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= GET =======================================//

// Get all screenings
router.get("/", async (req, res) => {
    try {
        const screenings = await screeningService.getAll();
        res.json({
            count: screenings.length,
            screenings
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get screenings for a specific movie
router.get("/movie/:movieId", async (req, res) => {
    try {
        const screenings = await screeningService.getByMovie(req.params.movieId);
        res.json({
            count: screenings.length,
            screenings
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get screenings for a specific room
router.get("/room/:roomId", async (req, res) => {
    try {
        const screenings = await screeningService.getByRoom(req.params.roomId);
        res.json({
            count: screenings.length,
            screenings
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get screening details
router.get("/:id", async (req, res) => {
    try {
        const screening = await screeningService.getById(req.params.id);
        if (!screening) {
            return setErrorResponse(req, res, errorCode(2301));
        }
        res.json({
            screening
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= PUT =======================================//

// Update screening (Admin only)
router.put("/:id", isLogin, isAdmin, async (req, res) => {
    const {error} = updateScreeningValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const updatedScreening = await screeningService.update(
            req.params.id,
            req.body
        );
        if (!updatedScreening) {
            return setErrorResponse(req, res, errorCode(2301));
        }
        res.json({
            screening: updatedScreening
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= DELETE =======================================//

// Delete screening (Admin only)
router.delete("/:id", isLogin, isAdmin, async (req, res) => {
    try {
        const deletedScreening = await screeningService.delete(req.params.id);
        if (!deletedScreening) {
            return setErrorResponse(req, res, errorCode(2301));
        }
        res.json({
            message: `Screening deleted successfully`
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
