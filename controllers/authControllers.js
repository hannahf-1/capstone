"use strict";

import { passport_config as passport } from "../config/passport.js";

import { model as UserAccounts } from "../models/userAccountModel.js";
import APIError from "../utils/APIError.js";
import httpStatus from "http-status"

// since we're pasing verifyCallback to authenticate, the UserAccountModel object isn't automatically added to the request as user(req.user)
// so we have to assign it ourselves
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new APIError(httpStatus[httpStatus.UNAUTHORIZED], httpStatus.UNAUTHORIZED));
    }
    req.user = user;

    // if (requiredRights.length) {
    //     const userRights = [];
    //     const roles = await Role.find({ _id: { $in: user.roles } }).populate('permissions');
    //     roles.forEach((i) => {
    //         i.permissions.forEach((j) => {
    //             userRights.push(`${j.controller}:${j.action}`);
    //         });
    //     });
    //     const hasRequiredRights = requiredRights.every((r) => userRights.includes(r));
    //     //console.log('requiredRights: ', requiredRights);
    //     //console.log('userRights: ', userRights);
    //     //console.log('boolean: ', hasRequiredRights);
    //     if (!hasRequiredRights) {
    //         return reject(new APIError('Resource access denied', httpStatus.FORBIDDEN));
    //     }
    // }

    console.log(`Successful login attempt\t User: ${req.user.username} IP: ${req.ip} `)

    return resolve();

}

const login = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        //we immediately invoke the function with (req, res, next) because pasport.authenticate is called in a route and expects the follwing parameters
        //since we're calling this in
        // e.g. passport.authenticate(strat, options ... req, res, next) 
        passport.authenticate("local", { failureRedirect: "/admin/login" }, verifyCallback(req, resolve, reject))(req, res, next)
    })
        .then(() => next() )
        .catch((err) => next(err))

}

export default {
    login
}

