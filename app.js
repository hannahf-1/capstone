"use strict";

import express from "express";
import session from "express-session"
import cors from "cors";
import helmet from "helmet";

import env_config from "./config/env_config.js"
import session_config from "./config/session.js";
import { passport_config as passport } from "./config/passport.js";
import logger from "./config/logger.js";
import routes from "./routes/v1/routes.js"
import mariadb_connector from "./config/maria_db.js";
import error_handler from "./middlewares/error.js";

//models
import { model as Events } from "./models/eventModel.js";
import { model as Reservation } from "./models/reservationModel.js";
import { model as Reviews } from './models/reviewModel.js'

const app = express();

//express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//access and security headers
app.use(cors());
app.use(helmet());

//passport and session configurations
app.use(session(session_config));
app.use(passport.initialize());

//routes
app.use(env_config.API_ROUTE, routes);

//custom error handling 
app.use(error_handler.converter)
app.use(error_handler.notFound)
app.use(error_handler.handler)

await mariadb_connector.connect();

app.listen(env_config.APP_PORT, () => {
    logger.info(`Server started on port ${env_config.APP_PORT}`);
})
