"use strict";
//next not required for any since its a controller

import httpStatus from "http-status";
import _ from "lodash";

import APIError from "../utils/APIError.js";
import { model as MenuItems } from "../models/menuModel.js";
import { model as Reservations } from "../models/reservationModel.js";
import { model as Events } from "../models/eventModel.js";
import logger from "../config/logger.js";
import RequestUtils from "../utils/requestUtils.js";
import { model as Review } from "../models/reviewModel.js";


export class publicInfoController {

    static #month = {
        "jan": 1,
        "feb": 2,
        "mar": 3,
        "apr": 4,
        "may": 5,
        "jun": 6,
        "jul": 7,
        "aug": 8,
        "sep": 9,
        "oct": 10,
        "nov": 11,
        "dec": 12
    }


    static getItemsByCatetory = async (req, res, next) => {
        const result = await MenuItems.findByCategory(req.params.category)

        //logger.debug(JSON.stringify(req.query))
        console.log(req.query)
        if (!result.length)
            throw new APIError(`Category ${req.params.category} doesn't exist`, httpStatus.NOT_FOUND)

        return res.send(JSON.stringify(result))
    }

    // TODO: Potentially remove option to get information other then the exsistence of a booking
    // Sequelize doesn't support querying union operations so we have to do it using sequelize raw sequelized_queries

    static getCalendar = async (req, res, next) => {

    }

    static getCalendarEvents = async (req, res, next) => {
        let sequelized_queries = RequestUtils.convertToSequelize(req.query)
        const events = await Events.findAllEvents(sequelized_queries)
        RequestUtils.send(req, res, events)//for logging
    }

    // TODO: Potentially remove option to get information other then the exsistence of a booking
    static getCalendarReservations = async (req, res, next) => {
        let sequelized_queries = RequestUtils.convertToSequelize(req.query)
        const reservations = await Reservations.findAllReservations(sequelized_queries)
        RequestUtils.send(req, res, reservations)
    }

    static submitBooking = async (req, res, next) => {
        const reservation = await Reservations.create(req.body)

        if (!reservation)
            throw new APIError("Failed to create reservation", httpStatus.INTERNAL_SERVER_ERROR)
        res.status(httpStatus.CREATED).json(reservation);
    }

    static submitJobApp = async (req, res, next) => {
        
    }

    static submitReview = async (req, res, next) => {
        const review = await Review.create(req.body);
        res.status(httpStatus.CREATED).json(review);
    }

}




export default publicInfoController;