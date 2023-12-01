"use strict";

import Joi from "joi";
import _ from "lodash";

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
}

export default validate;