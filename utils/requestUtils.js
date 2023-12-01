"use strict";

import { DateTime } from "luxon";
import logger from "../config/logger.js";
import { Op } from "sequelize"

export class RequestUtils {

    static convertToSequelize = (query) => {
        let query_entries = Object.entries(query)
        let extracted_queries = {}
        let sequelized = {};

        if (query_entries.length) {
            logger.debug(`Calendar Events Query: ${JSON.stringify(query)}`)
            //queries = _.pick(queries, ["month", "id"]
            query_entries.forEach(([key, value]) => {
                switch (key) {
                    case "month":
                        //sequelizeQuery["date_start"] = new Date(`${currentYear.toString()} ${value.toString()}`)
                        extracted_queries["date_start"] = DateTime.fromFormat(`${value}`, `MM`)
                        break;
                    case "id":
                        extracted_queries["id"] = value
                        break;
                    case "start_date":
                        extracted_queries["date_start"] = DateTime.fromISO(value)
                        break;
                    case "end_date":
                        extracted_queries["date_end"] = DateTime.fromISO(value)
                        break;
                }
            })
        }

        if (Object.entries(extracted_queries).length)
            sequelized.where = {};


        if (extracted_queries.hasOwnProperty("date_start")) {
            
            if (!extracted_queries.hasOwnProperty("date_end")) {
                extracted_queries["date_end"] = extracted_queries["date_start"].plus({ months: 1 })
            }

            Object.assign(sequelized.where, {
                date_start: {
                    [Op.between]: [extracted_queries.date_start.toISO(), extracted_queries.date_end.toISO()]
                },
            })
        }

        if (extracted_queries.hasOwnProperty("id")) {
            Object.assign(sequelized.where, {id: extracted_queries.id})
        }

        return sequelized;
    }

    static send = (req, res, data) => {
        if (res.headersSent) {
            logger.error(`Headers already sent to ${req.hostname}`)
            return;
        }
        const hostname = req.hostname
        res.json({
            count: data.length,
            data: [data]
        })
    
        if (res.headersSent)
            logger.http(`Sent Calender information to ${hostname}`);
    }
}

export default RequestUtils