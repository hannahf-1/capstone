"use strict";

import Joi from "joi";

export const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
}


export default {
    login
}
