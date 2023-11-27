"use strict";

import { Router } from "express";

/* TODO: 
    middleware
    administrative functions for managing additional users
 */
const router = Router();

router.post("login");
router.post("logout");
router.post("verify-email"); //might not be needed
router.post("reset-password");
router.post("send-verificaiton");

export default router;