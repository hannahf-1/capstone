"use strict";
import env_config from './env_config.js';
import logger from './logger.js';
import _ from 'lodash';

export class Defaults {

    static #session_config = {
        secret: env_config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: env_config.SESSION_COOKIE_MAX_AGE,
            httpOnly: true,
            sameSite: 'strict'
        }
    }

    static #limiter_config = {
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Use an external store for consistency across multiple server instances.
    }

    static request_logger = (detail = "") => (req, res, next) => {

        let relevant_headers = _.pick(req, [
            /* "user-agent", 
            "x-forwarded-for", 
            "x-forwarded-proto", 
            "x-forwarded-host" */
            "body",
            "query",
            "params",
            "session",
            "user",
            "isAuthenticated",
        ])

        logger.http(`New Request: ${req.method} ${req.originalUrl} ${req.ip}`)

        Object.entries(relevant_headers).forEach(([key, value]) => {
            switch (key) {
                case "headers":
                    if (detail === "full") logger.http(`\tRequest {Headers}: ${JSON.stringify(value)}`)
                    break;
                case "isAuthenticated":
                    logger.http(`\tRequest Authenitcated: ${req.isAuthenticated()}`)
                    break;
                default:
                    if (Object.entries(value).length)
                        logger.http(`\tRequest ${key}: ${JSON.stringify(value)}`)
                    break;
            }
        })
        next()
    }

    static get session_config() {
        return Defaults.#session_config
    }


    static get limiter_config() {
        return Defaults.#limiter_config
    }
}

export default Defaults;

