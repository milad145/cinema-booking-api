// libs/routes/screening/route.js
import express from 'express';
import ScreeningService from './service.js';
import {createScreeningValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isLogin} from "../../middlewares/index.js";

const screeningService = new ScreeningService;

const router = express.Router();

router.post("/", isLogin, async (req, res) => {
    const {error} = createScreeningValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const screening = await screeningService.create(req.body);
        res.json({screening});
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

router.get("/room/:roomId", async (req, res) => {
    try {
        const screenings = await screeningService.getByRoom(req.params.roomId);
        res.json({screenings});
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
