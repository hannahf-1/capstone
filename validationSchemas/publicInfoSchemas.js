"use strict";

import Joi from "joi";

export class PublicInfoSchemas {
    static #calendar = {
        query: Joi.object().keys({
            type: Joi.string().valid("events", "bookings"),
            month: Joi.alternatives().try(
                Joi.number().min(1).max(12),
                Joi.string()
            ),
            id: Joi.alternatives().try(
                Joi.number().min(0),
                Joi.string().guid({ version: ["uuidv4", "uuidv5"] })
            ),
            start_date: Joi.date().iso(),
            end_date: Joi.date().iso(),
        })
    }

    static #reservation = {
        query: Joi.object().keys({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
            occasion: Joi.string().max(255).required(),
            first_name: Joi.string().max(50).required(),
            last_name: Joi.string().max(50).required(),

            phone_number: Joi.string().max(15),
            email: Joi.string().email().max(100).allow(null),

            method_of_contact: Joi.string().max(100).required(),
            date_start: Joi.date().iso().required(),
            date_end: Joi.date().iso().allow(null).default(null),
            additional_information: Joi.string().max(65535).allow(null).default(null),
            services: Joi.string().max(100).allow(null).default(null),
            special_request: Joi.string().max(65535).allow(null).default(null),
        }).or("email", "phone_number")
    }

    get calendar() {
        return PublicInfoSchemas.#calendar
    }

    get reservation() {
        return PublicInfoSchemas.#reservation
    }

}

export default PublicInfoSchemas