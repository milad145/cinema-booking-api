import express from 'express';

import RoomService from './service.js';
import {createRoomValidation, updateRoomValidation} from "./validation.js";
import {setErrorResponse} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
import {isAdmin, isLogin} from "../../middlewares/index.js";

const roomService = new RoomService;

const router = express.Router();

//======================================= POST =======================================//

// Create new room (Admin only)
router.post("/", isLogin, isAdmin, async (req, res) => {
    const {error} = createRoomValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    const {name, rows, seatsPerRow} = req.body;

    try {
        const room = await roomService.create(name, rows, seatsPerRow);
        res.status(201).json({
            room: {
                _id: room._id,
                name: room.name,
                rows: room.rows,
                seatsPerRow: room.seatsPerRow,
                seats: room.seats
            }
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= GET =======================================//

// Get all rooms
router.get("/", async (req, res) => {
    try {
        const rooms = await roomService.getAll();
        res.json({
            count: rooms.length,
            rooms: rooms
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Get single room by ID
router.get("/:id", async (req, res) => {
    try {
        const room = await roomService.getById(req.params.id);
        if (!room) {
            return setErrorResponse(req, res, errorCode(2102));
        }
        res.json({
            room
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= PUT =======================================//

// Update room (Admin only)
router.put("/:id", isLogin, isAdmin, async (req, res) => {
    const {error} = updateRoomValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const updatedRoom = await roomService.update(req.params.id, req.body);
        if (!updatedRoom) {
            return setErrorResponse(req, res, errorCode(2102));
        }
        res.json({
            room: updatedRoom
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

//======================================= DELETE =======================================//

// Delete room (Admin only)
router.delete("/:id", isLogin, isAdmin, async (req, res) => {
    try {
        const deletedRoom = await roomService.delete(req.params.id);
        if (!deletedRoom) {
            return setErrorResponse(req, res, errorCode(2102));
        }
        res.json({
            message: `Room deleted successfully`
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
