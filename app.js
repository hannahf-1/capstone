"use strict";
//modules
import express from "express";
import session from "express-session"
import cors from "cors";
import helmet from "helmet";

//local modules
import env_config from "./config/env_config.js"
import { passport_config as passport } from "./config/passport.js";
import logger from "./config/logger.js";
import routes from "./routes/v1/routes.js"
import mariadb_connector from "./config/maria_db.js";
import error_handler from "./middlewares/error.js";
import rateLimit from "express-rate-limit";
import Defaults from "./config/defaults.js";
import { model as AppPrimary } from "./models/application_models/primaryModel.js";
import { model as AppEducationHistory } from "./models/application_models/educationHistoryModel.js";
import { model as AppEmploymentHistory } from "./models/application_models/employmentHistoryModel.js";
import { model as AppReferences } from "./models/application_models/referencesModel.js";
import { model as MenuTable } from "./models/menu_Models/menuModel.js";
import { model as CatTable } from "./models/menu_Models/categoryModel.js";

//initialization
const app = express();

//express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//security configurations
app.use(cors());
//app.use(helmet());
app.use(rateLimit(Defaults.limiter_config));

//session and passport configuration
app.use(session(Defaults.session_config));
app.use(passport.initialize());

app.use(Defaults.request_logger());

//routes
app.use(express.static(process.cwd() + "/public"))
app.get("/review", (req, res) => {
    res.sendFile(process.cwd() + "/public/send_review.html")
})

app.use(env_config.API_ROUTE, routes);

//logging and error handling
app.use(error_handler.converter)
app.use(error_handler.notFound)
app.use(error_handler.handler)

//database connection
await mariadb_connector.check_connection();

/* await mariadb_connector.initializeTables(true,
    CatTable,
    MenuTable,
)
 */
app.listen(env_config.APP_PORT, () => {
    logger.info(`Server started on port ${env_config.APP_PORT}`);
})
