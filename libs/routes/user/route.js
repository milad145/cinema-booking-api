import express from 'express';

import UserService from './service.js';
import {errorCode} from "../../modules/errorHandler.js";
import {setErrorResponse} from "../../modules/assist.js";
import {loginValidation, registerValidation} from "./validation.js";
import {isAdmin, isLogin} from "../../middlewares/index.js";

const userService = new UserService;

const router = express.Router();

//======================================= POST =======================================//

// Public registration (defaults to user role)
router.post("/register", async (req, res) => {
    const {error} = registerValidation.validate(req.body)
    if (error)
        return setErrorResponse(req, res, errorCode(400))

    let {username, password} = req.body;

    username = username.toLowerCase()
    try {
        const result = await userService.register(username, password)
        res.json(result)
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

// Admin-only registration
router.post("/register-admin", isLogin, isAdmin, async (req, res) => {
    const {error} = registerValidation.validate(req.body);
    if (error) return setErrorResponse(req, res, errorCode(400));

    try {
        const {username, password} = req.body;
        const result = await userService.register(username, password, 'admin');
        res.json(result);
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

// Login (same for both roles)
router.post("/login", async (req, res) => {
    try {
        const {error} = loginValidation.validate(req.body)
        if (error)
            return setErrorResponse(req, res, errorCode(400))

        let {username, password} = req.body;
        username = username.toLowerCase()
        const user = await userService.login(username, password)
        res.json(user);
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

//======================================= GET =======================================//

// Get current user profile
router.get("/me", isLogin, async (req, res) => {
    try {
        res.json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role
            }
        });
    } catch (e) {
        setErrorResponse(req, res, e);
    }
});

export default router;
