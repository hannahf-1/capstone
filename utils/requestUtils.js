"use strict";

import { DateTime } from "luxon";
import logger from "../config/logger.js";
import { INTEGER, Op } from "sequelize"

//optimized using ChatGPT
export class RequestUtils {

    static sequalizeQuery = (query) => {
        const query_entries = Object.entries(query);
        const sequelized = {};
    
        if (query_entries.length) {    
            query_entries.forEach(([key, value]) => {
                switch (key) {
                    case "month":
                        sequelized.where = {
                            //if month value is passed, get all events for that month
                            date_start: {
                                [Op.between]: [
                                    DateTime.fromFormat(`${value}`, RequestUtils.#getMonthAbbreviation(value)).toISO(),
                                    DateTime.fromFormat(`${value}`, RequestUtils.#getMonthAbbreviation(value)).plus({ months: 1 }).toISO(),
                                ],
                            },
                        };
                        break;

                        //if id is passed, get that specific event
                    case "id":
                        sequelized.where = { id: value };
                        break;

                        //if start_date is passed, get all events from that date
                    case "start_date":
                        sequelized.where.date_start = {
                            [Op.gte]: DateTime.fromISO(value).toISO(),
                        };
                        break;
                    case "end_date":
                        if (!sequelized.where.date_start) {
                            sequelized.where.date_start = {
                                [Op.gte]: DateTime.now().toISO(),
                            };
                        }
                        sequelized.where.date_end = {
                            [Op.between]: [
                                DateTime.fromISO(value).toISO(),
                                DateTime.fromISO(value).plus({ days: 1 }).toISO(),
                            ],
                        };
                        break;
                }
            });
        }
    
        return sequelized;
    };

    
    static send = (req, res, data) => {
        if (res.headersSent) {
            logger.error(`Headers already sent to ${req.hostname}`)
            return;
        }
        const hostname = req.ip
        res.json({
            count: data.length,
            data: [data]
        })

        if (res.headersSent)
            logger.http(`Sent data to ${hostname}`);
    }

    // TODO: better error handling using custom errors and httpStatus
    static #getMonthAbbreviation = (month_value = '') => {
        if (!isNaN(month_value) && Number.isInteger(Number(month_value))) {
            const month_number = Number(month_value);

            if (month_number > 12 || month_number < 1)
                throw new Error("Month number is out of range")

            return "MM"
        }

        else {
            if (!month_value || typeof month_value !== "string" || month_value.length < 3)
                throw new Error("Invalid month string");

            const month_abberivation = month_value.length > 3 ? "MMMM" : "MMM"
            const err = DateTime.fromFormat(`${month_value}`, month_abberivation).invalidReason

            if (err) throw new Error(err)

            return month_abberivation
        }
    }
}

export default RequestUtils