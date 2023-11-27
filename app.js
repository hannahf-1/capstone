"use strict";

import env_config from "./config/env_config.js"

import express from "express";
import session from "express-session"
import cors from "cors";
//import winston from "winston";
import helmet from "helmet";


import session_config  from "./config/session.js";
import { passport_config } from "./config/passport.js";

const app = express();

//express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//access and security headers
app.use(cors());
app. use(helmet());

//passport and session configurations
app.use(session(session_config));
app.use(passport_config.initialize());
app.use(passport_config.session());


//login test routes
app.get("/login", (req, res) => {
    res.send("Login Page");
})

app.post('/login',
  passport.authenticate("local", { failureRedirect: "login" }),
  (req, res, next) => {
    res.render("home", { user: req.user })
  }
)




app.listen(() => {
    console.log("Server started on port " + env_config.PORT);
})