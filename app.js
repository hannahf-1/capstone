"use strict";

import express from "express";

import cors from "cors";
import winston from "winston";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));