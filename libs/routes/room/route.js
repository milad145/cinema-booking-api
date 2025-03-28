import express from 'express';

import RoomService from './service.js';
import {createRoomValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isLogin} from "../../modules/middlewares.js";

const roomService = new RoomService;


const router = express.Router();
//============================= POST =============================//

router.post("/", isLogin, async (req, res) => {
    const {error} = createRoomValidation.validate(req.body)
    if (error)
        return setErrorResponse(req, res, errorCode(400))

    let {name, seats} = req.body;

    try {
        const {_id} = await roomService.create(name, seats)
        res.json({room: {_id, name, seats}})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

//============================= GET =============================//

router.get("/", async (req, res) => {
    try {
        const rooms = await roomService.getRooms()
        res.json({rooms: rooms})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});


router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const room = await roomService.getRoom(id)
        res.json({room})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

export default router;
