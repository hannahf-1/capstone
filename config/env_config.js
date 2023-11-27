"use strict";

import dotenv from 'dotenv';
import Joi from 'joi';


if (!process.env.NODE_ENV)
    dotenv.config({ path: "./.env" })

const envSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        APP_NAME: Joi.string().allow('').empty('').default('_App Name Not Set_'),
        HOST: Joi.string().allow('').empty('').default('localhost'),
        PORT: Joi.number().allow('').empty('').default(663),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_DIALECT: Joi.string().default("mariadb"),

        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),

        SESSION_SECRET: Joi.string().alphanum().min(10).required(),
        SESSION_COOKIE_MAX_AGE: Joi.number().integer().min(3600).max(86400).default(3600),

    })
    .unknown();//ignores other env variables

const { value: env, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config env error: ${error.message}`);
}

console.log(env.SESSION_COOKIE_MAX_AGE)

export default {
    NODE_ENV: env.NODE_ENV,
    APP_NAME: env.APP_NAME,
    HOST: env.HOST,
    PORT: env.PORT,

    DB_HOST: env.DB_HOST,
    DB_PORT: env.DB_PORT,
    DB_DIALECT: env.DB_DIALECT,
    
    DB_NAME: env.DB_NAME,
    DB_USER: env.DB_USER,
    DB_PASS: env.DB_PASS,

    SESSION_SECRET: env.SESSION_SECRET,
    SESSION_COOKIE_MAX_AGE: env.SESSION_COOKIE_MAX_AGE,
}
