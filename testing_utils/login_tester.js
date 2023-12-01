"use strict";
import express from "express";
import session from "express-session"
import { session_config } from "../config/session.js";
import { passport_config } from "../config/passport.js";
import mariadb_connector from "../config/maria_db.js";
import env_config from "../config/env_config.js";
import validate from "../middlewares/validate.js";
import authSchemas from "../validationSchemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import catchAsync from "../utils/catchAsync.js";
import { model as UAC } from "../models/userAccountModel.js";
import logger from "../config/logger.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/testing_utils/public"));
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/testing_utils/views")
app.use(session(session_config));
app.use(passport_config.initialize());

app.get("/", (req, res) => {
    const user = req.user || "Guest";
    res.render("home", { user });
});

app.post('/login',
    validate(authSchemas.login),
    authControllers.login,
    (req, res, next) => {
        logger.info(req.isAuthenticated());
        res.render("home", { user: req.user, api_route: env_config.API_ROUTE })
    }
)

/* app.post('/login',
    passport_config.authenticate("local", { failureRedirect: "login" }),
    (req, res, next) => {
        res.render("home", { user: req.user, api_route: env_config.API_ROUTE })
    }
)
 */

app.get("/login", (req, res) => {
    res.render("login");
});


app.get("/logout", (req, res) => {
    logger.info(req.user)
})

await mariadb_connector.connect();

app.listen(3000, () => {
    logger.info("Server started on port 3000");
})
