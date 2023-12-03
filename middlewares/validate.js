"use strict";

import Joi from "joi";
import _ from "lodash";


//v2 works with multiple schemas and is asyncronous
const validate = (...schema) => (req, res, next) => {
    Promise.all(schema.map(schema => {
        //ensure that the schema has atleast one of the following keys
        const validSchema = _.pick(schema, ["params", "query", "body"]);
        //from the 3 possible parameters in validSchema filter the request object
        const validReqProperties = _.pick(req, Object.keys(validSchema))

        //surround with promise to ensure that all schemas are validated
        return new Promise((resolve, reject) => {
            //store failure|success in appropriate objects
            const { error, value } = Joi.compile(validSchema)
                .prefs({
                    abortEarly: false, //return all errors not just the first occurance
                    // errors: {
                    //     label: "full",
                    //     //wrap: { label: false } ,
                    // }
                })
                .validate(validReqProperties)

            if (error) reject(error)
            //assign validated and formatted properties to the request object
            else Object.assign(req, value);
            resolve();
        })
    }))
    .then(() => next())
    .catch(error => next(error))
}


//v1
/* 
const validate = (schema)  => 
    (req, res, next) => {

        //ensure that the schema has atleast one of the following keys
        const validSchema = _.pick(schema, ["params", "query", "body"]);

        //from the 3 possible parameters in validSchema filter the request object
        const validReqProperties = _.pick(req, Object.keys(validSchema))

        //store failure|success in appropriate objects
        const { error, value } = Joi.compile(validSchema)
        .prefs({
            abortEarly: false, //return all errors not just the first occurance
            // errors: {
            //     label: "full",
            //     //wrap: { label: false } ,
            // }
        })
        .validate(validReqProperties)

        if(error) return next(error)

        //assign validated and formatted properties to the request object
        Object.assign(req, value);
        next();
} */



export default validate;