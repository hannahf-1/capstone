"use strict";

import winston from "winston";
import env_config from "./env_config.js";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
});


export const logger = winston.createLogger({
    levels,
    level: env_config.isDevelopment() ? 'debug' : 'warn',
    format: winston.format.combine(
        //winston.format.colorize({all: true}), //we define this in the transport because it messes up the log files color indicator
        winston.format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        winston.format.printf((info) => `${[info.timestamp]}: ${info.level}: ${info.message}`),
        
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize({ all: true })
        }),
        
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: '10000000',
            maxFiles: '10'
        }),
        
        new winston.transports.File({
            level: 'error',
            filename: 'logs/error.log',
            maxsize: '10000000',
            maxFiles: '10'
        }),
    ],
});

export default logger;
