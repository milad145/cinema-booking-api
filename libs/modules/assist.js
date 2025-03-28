import jwt from 'jsonwebtoken'

import config from '../config/index.js';

export const formatIpAddress = (address) => {
    if (typeof address === "string")
        return address.startsWith("::ff" + "ff:") ? address.slice(7) : address;
    else
        return "Unknown IP";
}

export const setErrorResponse = (req, res, err) => {
    if (!err.responseCode) {
        console.error("Processing request '%s %s' from '%s' failed:", req.method || "Unknown", req.originalUrl || "request", formatIpAddress(req.ip), err.message || err);
    }
    let errorStatus = 403;
    if (err.responseCode) {
        errorStatus = err.responseCode
        err = new Error(err.message)
    }
    res.status(errorStatus).send(err.message)
}

export const getWeekDay = (n) => {
    let day = new Array(7);
    day[1] = 'mon';
    day[2] = 'tues';
    day[3] = 'wed';
    day[4] = 'thurs';
    day[5] = 'fri';
    day[6] = 'sat';
    day[0] = 'sun';
    return day[n];
}

export const generateJWTToken = (data) => {
    data = JSON.parse(JSON.stringify(data))
    let secret = config["accessTokenSecret"];
    let expiresIn = config["accessTokenExpireTime"]
    if (secret && expiresIn) {
        return jwt.sign({data}, secret, {expiresIn})
    }
    return ''
}

export const validateJWTToken = async (token) => {
    try {
        let secret = config["accessTokenSecret"];
        const {data} = await jwt.verify(token, secret);
        return data;
    } catch (e) {
        throw e
    }
}
