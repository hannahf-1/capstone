"use strict";

import session from 'express-session';
import env_config from './env_config.js';

const session_config = {
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

export default session_config;
export { session_config };

