import express from 'express';

import MovieService from './service.js';
import {createMovieValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isLogin} from "../../middlewares/index.js";

const movieService = new MovieService;


const router = express.Router();
//============================= POST =============================//

router.post("/", isLogin, async (req, res) => {
    const {error} = createMovieValidation.validate(req.body)
    if (error)
        return setErrorResponse(req, res, errorCode(400))

    let {name, poster, schedule, room} = req.body;

    try {
        const {_id} = await movieService.create(name, poster, schedule, room)
        res.json({room: {_id, name, poster, schedule, room}})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

//============================= GET =============================//

router.get("/", async (req, res) => {
    try {
        const rooms = await movieService.getRooms()
        res.json({rooms: rooms})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});


router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const room = await movieService.getRoom(id)
        res.json({room})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

export default router;
