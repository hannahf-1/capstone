"use strict";

import APIError from "./APIError";

// TODO: Implement this class

class QueryError extends APIError {

    constructor(message, status, bad_parameters, isOperational = true) {
        super(message, status, isOperational);

    }

}