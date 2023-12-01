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
    
    static #educationHistorySchema = {
        query: Joi.object().keys({
            school_name: Joi.string().max(255).required(),
            years_attended: Joi.number().integer().required(),
            school_location: Joi.string().max(255).required(),
            city: Joi.string().max(60).required(),
            state_: Joi.string().max(60).required(),
            degree_received: Joi.string().max(100).required(),
            major: Joi.string().max(100).required(),
            applicationPersonalApplicationId: Joi.string().guid({ version: 'uuidv4' }).allow(null).default(null),
        }),
    };

    static #employmentHistorySchema = {
        query: Joi.object().keys({
            position: Joi.string().max(100).required(),
            desired_salary: Joi.number().integer().required(),
            date_available: Joi.date().iso().required(),
            employer: Joi.string().max(100).required(),
            dates_employed_start: Joi.date().iso().required(),
            dates_employed_end: Joi.date().iso().required(),
            work_phone: Joi.string().max(16).required(),
            pay_rate: Joi.number().integer().required(),
            street_address: Joi.string().max(255).required(),
            city: Joi.string().max(60).required(),
            state_: Joi.string().max(60).required(),
            zip: Joi.string().max(10).required(),
            position_held: Joi.string().max(100).required(),
            duties_performed: Joi.string().max(255).required(),
            supervisor_name: Joi.string().max(255).required(),
            reason_for_leave: Joi.string().max(255).required(),
            can_contact: Joi.boolean().required(),
            applicationPersonalApplicationId: Joi.string().guid({ version: 'uuidv4' }).allow(null).default(null),
        }),
    };

    static #personalSchema = {
        query: Joi.object().keys({
            application_id: Joi.string().guid({ version: 'uuidv4' }).required(),
            last_name: Joi.string().max(100).required(),
            first_name: Joi.string().max(100).required(),
            middle_name: Joi.string().max(100).required(),
            street_address: Joi.string().max(255).required(),
            city: Joi.string().max(60).required(),
            state_: Joi.string().max(60).required(),
            zip: Joi.string().max(10).required(),
            home_phone: Joi.string().max(15).required(),
            cell_phone: Joi.string().max(15).required(),
            email: Joi.string().email().max(100).required(),
            social_security: Joi.string().max(12).required(),
            us_citizen: Joi.boolean().required(),
            convicted_felony: Joi.boolean().required(),
            drug_test: Joi.boolean().required(),
        }),
    };

    static #referenceSchema = {
        query: Joi.object().keys({
            id: Joi.number().integer().required(),
            application_fk_id: Joi.string().guid({ version: 'uuidv4' }).required(),
            reference_name: Joi.string().max(100).required(),
            title: Joi.string().max(100).required(),
            company: Joi.string().max(100).required(),
            phone_number: Joi.string().max(15).required(),
            applicationPersonalApplicationId: Joi.string().guid({ version: 'uuidv4' }).allow(null).default(null),
        }),
    };

    get calendar() {
        return PublicInfoSchemas.#calendar
    }

    get reservation() {
        return PublicInfoSchemas.#reservation
    }

}

export default PublicInfoSchemas