"use strict";
import express from "express";
import session from "express-session"
import { session_config } from "../config/session.js";
import { passport_config } from "../config/passport.js";
import mariadb_connector from "../config/maria_db.js";

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
    passport_config.authenticate("local", { failureRedirect: "login" }),
    (req, res, next) => {
        res.render("home", { user: req.user })
    }
)

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
    console.log(req.user)
})

await mariadb_connector.connect();

app.listen(3000, () => {
    console.log("Server started on port 3000");
})
