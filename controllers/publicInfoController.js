"use strict";
//next not required for any since its a controller

import httpStatus from "http-status";
import _ from "lodash";

import { model as MenuItems } from "../models/menuModel.js";
import { model as Reservations } from "../models/reservationModel.js";
import { model as Events } from "../models/eventModel.js";
import { model as Review } from "../models/reviewModel.js";
import { model as PrimaryInfo } from "../models/application_models/primaryModel.js";
import { model as EducationHistory } from "../models/application_models/educationHistoryModel.js";
import { model as EmploymentHistory } from "../models/application_models/employmentHistoryModel.js";
import { model as References } from "../models/application_models/referencesModel.js";

import APIError from "../utils/APIError.js";
import logger from "../config/logger.js";
import RequestUtils from "../utils/requestUtils.js";
export class publicInfoController {
    static getItemsByCatetory = async (req, res, next) => {
        const result = await MenuItems.findByCategory(req.params.category)
        if (!result.length)
            throw new APIError(`Category ${req.params.category} doesn't exist`, httpStatus.NOT_FOUND)

        return res.send(JSON.stringify(result))
    }

    // TODO: Potentially remove option to get information other then the exsistence of a booking
    // Sequelize doesn't support querying union operations so we have to do it using sequelize raw sequelized_queries

    /* static getCalendar = async (req, res, next) => {

    } */

    static getCalendarEvents = async (req, res, next) => {
        let sequelized_queries = RequestUtils.sequalizeQuery(req.query)
        const events = await Events.findAllEvents(sequelized_queries)
        RequestUtils.send(req, res, events)//for logging
    }

    // TODO: Potentially remove option to get information other then the exsistence of a booking
    static getCalendarReservations = async (req, res, next) => {
        let sequelized_queries = RequestUtils.sequalizeQuery(req.query)
        const reservations = await Reservations.findAllReservations(sequelized_queries)
        RequestUtils.send(req, res, reservations)
    }

    static createBooking = async (req, res, next) => {
        const reservation = await Reservations.create(req.body)
        logger.info(`Created reservation ref: ${reservation.id}`)
        res.status(httpStatus.CREATED).json(reservation);
    }

    static createReview = async (req, res, next) => {
        const review = await Review.create(req.body);
        logger.info(`Created user review ref: ${review.id}`)
        res.status(httpStatus.CREATED).json(review);
    }

    // TODO: maybe move all of this into ApplicationPrimaryModel class
    //v1
    static createJobApp = async (req, res, next) => {
        if (!req.body.application_primary.id)
            delete req.body.application_primary.id

        const primary_info = await PrimaryInfo.create(req.body.application_primary)
        //we don't have to worry about stray data since they'll be caught in validation
        const app_data = _.omit(req.body, ["application_primary"])

        //Object.entries(app_data).forEach(async ([key, value]) => {

        /* 
            Originally planned on using the code above but was recommended by ChatGPT of this asyncronous approach.
            Main difference is that rather then doing each entry sequentially, we map each key,entry pair to a promise (async (...))
            and then await all of them at once. This is much faster then the for each approach
        */
        await Promise.all(Object.entries(app_data).map(async ([key, value]) => {
            let class_model = null;

            switch (key) {
                case "application_education_history":
                    class_model = EducationHistory
                    break;
                case "application_employment_history":
                    class_model = EmploymentHistory
                    break;
                case "application_reference": // just incase
                case "application_references":// default
                    class_model = References
                    break;
                default:
                    throw new APIError(`Invalid key during app creation '${key}'`, httpStatus.INTERNAL_SERVER_ERROR)
            }

            let associationFunctionName =
                `${PrimaryInfo.name[0].toUpperCase()}${PrimaryInfo.name.slice(1)}${PrimaryInfo.options.freezeTableName ? "" : "s"}`;
            let created_models = null;


            //set primary key based off of PrimaryInfo(ApplicationPrimaryModel)
            //using the method below accounts for modelName changes and plural names (except "ies")
            if (Array.isArray(value)) {
                created_models = await class_model.bulkCreate(value)
                await Promise.all(created_models.map(async (model) => {
                    await model[`set${associationFunctionName}`](primary_info)
                }))
            } else {
                created_models = await class_model.create(value);
                await created_models[`set${associationFunctionName}`](primary_info)
            }
        }))

        logger.info(`Created job application entry ref: ${primary_info.id}`)
        res.status(httpStatus.CREATED).json({ app_reference: primary_info.id });
    }
    // TODO: maybe move all of this into ApplicationPrimaryModel class
    //v1
    static createJobApp = async (req, res, next) => {
        if (!req.body.application_primary.id)
            delete req.body.application_primary.id

        const primary_info = await PrimaryInfo.create(req.body.application_primary)
        if (!primary_info)
            throw new APIError("Failed to create job application", httpStatus.INTERNAL_SERVER_ERROR)

        //we don't have to worry about stray data since they'll be caught in validation
        const app_data = _.omit(req.body, ["application_primary"])

        //Object.entries(app_data).forEach(async ([key, value]) => {

        /* 
            Originally planned on using the code above but was recommended by ChatGPT of this asyncronous approach.
            Main difference is that rather then doing each entry sequentially, we map each key,entry pair to a promise (async (...))
            and then await all of them at once. This is much faster then the for each approach
        */
        await Promise.all(Object.entries(app_data).map(async ([key, value]) => {
            let class_model = null;

            switch (key) {
                case "application_education_history":
                    class_model = EducationHistory
                    break;
                case "application_employment_history":
                    class_model = EmploymentHistory
                    break;
                case "application_reference":
                    class_model = References
                    break;
                default:
                    throw new APIError(`Invalid key during app creation ${key}`, httpStatus.INTERNAL_SERVER_ERROR)
            }

            let associationFunctionName =
                `${PrimaryInfo.name[0].toUpperCase()}${PrimaryInfo.name.slice(1)}${PrimaryInfo.options.freezeTableName ? "" : "s"}`;
            let created_models = null;


            //set primary key based off of PrimaryInfo(ApplicationPrimaryModel)
            //using the method below accounts for modelName changes and plural names (except "ies")
            if (Array.isArray(value)) {
                created_models = await class_model.bulkCreate(value)
                await Promise.all(created_models.map(async (model) => {
                    await model[`set${associationFunctionName}`](primary_info)
                }))
            } else {
                created_models = await class_model.create(value);
                await created_models[`set${associationFunctionName}`](primary_info)
            }
        }))

        logger.info(`Created job application entry ref: ${primary_info.id}`)
        res.status(httpStatus.CREATED).json({ app_reference: primary_info.id });

    }

}




export default publicInfoController;