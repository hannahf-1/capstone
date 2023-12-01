"use strict";

import { Router } from "express";
import authSchemas from "../../../validationSchemas/authSchemas.js";
import authController from "../../../controllers/authControllers.js"
import validate from "../../../middlewares/validate.js";
import catchAsync from "../../../utils/catchAsync.js";


/* TODO: 
    middleware
    administrative functions for managing additional users
 */
const router = Router();

router.post("login", validate(authSchemas.login), authController.login);
router.post("logout");
router.post("verify-email"); //might not be needed
router.post("reset-password");
router.post("send-verificaiton");

export default router;