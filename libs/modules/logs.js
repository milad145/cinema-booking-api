/* logs.js */

import fs from 'fs';
import os from 'os';
import path from 'path';
import util from 'util';
import {getWeekDay} from "./assist.js";

export const APP_LOG = path.join("logs", "app.log");
let mainLogFile = null;
let date = null;

export const initLogs = (logPath) => {
    const {debug, error, info, log, warn} = console;

    console.debug = async(data, ...args) => {
        data = format(data);
        if (debug) debug.apply(this, ["[DEBUG] " + data, ...args]);
        await logger(mainLogFile, "[DEBUG] ", data, args);
    };

    console.error = async(data, ...args) => {
        data = format(data);
        if (error) error.apply(this, ["[ERROR] " + data, ...args]);
        await logger(mainLogFile, "[ERROR] ", data, args);
    };

    console.info = async (data, ...args) => {
        data = format(data);
        if (info) info.apply(this, ["[INFO] " + data, ...args]);
        await logger(mainLogFile, "[INFO] ", data, args);
    };

    console.log = async (data, ...args) => {
        data = format(data);
        if (log) log.apply(this, [data, ...args]);
        await logger(mainLogFile, "", data, args);
    };

    console.warn = async (data, ...args) => {
        data = format(data);
        if (warn) warn.apply(this, ["[WARNING] " + data, ...args]);
        await logger(mainLogFile, "[WARNING] ", data, args);
    };

    try {
        fs.mkdirSync("logs")
    } catch (err) {
    }

    mainLogFile = fs.createWriteStream(logPath, {flags: 'a'});

    mainLogFile.on('error', function (err) {
        warn("Failed to create log file:", err.message);
        mainLogFile = null;
    });

    if (mainLogFile) {
        mainLogFile.write(os.EOL + "-".repeat(74) + os.EOL);
        mainLogFile.write("Logs begin at " + new Date().toString() + os.EOL);
        mainLogFile.write("-".repeat(74) + os.EOL + os.EOL);
    }

    process.on('unhandledRejection', function (reason/*, promise*/) {
        console.error('Unhandled promise rejection:', reason)
    });

    process.on('uncaughtException', function (err) {
        console.error("[EXCEPTION] Unhandled", err);
        console.error("Process will be terminated because of unhandled exception!");

        if (mainLogFile)
            mainLogFile.end(function () {
                process.exit(1)
            });
        else
            process.exit(1)
    });
};

/*
 * Utility Functions
*/

function format(data) {
    return (!!data && (data.constructor === Object || data.constructor === Array)) ?
        JSON.stringify(data, null, 1).replace(/\r?\n|\r/g, "") : data
}

async function logger(file, type, data, args) {
    await getDate()
    if (file)
        file.write("[" + new Date().toLocaleString(
                'en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(",", "") + "] " +
            util.format.apply(this, [type + data, ...args])
                .replace(/([\n\r]+)(?!\s{2})/g, os.EOL + "  ") + os.EOL);
}

async function getDate() {
    let now = new Date();
    let year = now.getFullYear() + "";
    let month = ("0" + now.getMonth()).slice(-2);
    let day = ("0" + now.getDate()).slice(-2);
    let weekDay = getWeekDay(now.getDay());
    let newDate = (year + month + day)
    if (weekDay === 'mon' && newDate !== date) {
        try {
            let oldLogFileName = path.join('logs', `app-${newDate}.log`)
            await fs.copyFileSync(APP_LOG, oldLogFileName)
            await fs.writeFileSync(APP_LOG, os.EOL + "-".repeat(74) + os.EOL)
        } catch (e) {
            console.error(e)
        }
    }
    date = newDate
}
