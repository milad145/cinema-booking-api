import express from 'express';

import UserService from './service.js';

const userService = new UserService;

import {errorCode} from "../../modules/errorHandler.js";
import {setErrorResponse} from "../../modules/assist.js";
import {loginValidation, registerValidation} from "./validation.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = registerValidation.validate(req.body)
    if (error)
        return setErrorResponse(req, res, errorCode(400))

    let {username, password} = req.body;

    username = username.toLowerCase()
    try {
        const {accessToken} = await userService.register(username, password)
        res.send({accessToken})
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

router.post("/login", async (req, res) => {
    try {
        const {error} = loginValidation.validate(req.body)
        if (error)
            return setErrorResponse(req, res, errorCode(400))

        let {username, password} = req.body;
        username = username.toLowerCase()
        const {accessToken} = await userService.login(username, password)
        res.send({accessToken});
    } catch (e) {
        setErrorResponse(req, res, e)
    }
});

export default router;
