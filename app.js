import mongoose from "mongoose";

import config from './libs/config/index.js'

import {initLogs, APP_LOG} from './libs/modules/logs.js';
import {initiateExpress} from "./libs/init.js";

initLogs(APP_LOG);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.database);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        await initiateExpress(config)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

(() => connectDB())()
