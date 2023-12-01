"use strict";

import { Router } from "express";

//TODO: add middleware

const router = Router();

router.get("getRequests");
router.get("getApprovedRequests");
router.get("getRejectedRequests");
router.get("getRequestHistory");
router.get(":bookingsID");

router.put(":bookingID")
router.put(":bookingID/approve");
router.put(":bookingID/reject");
router.put(":bookingID/complete");
router.put(":bookingID/cancel");

export default router;