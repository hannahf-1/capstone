"use strict";

/* TODO:
    = [ ] eve
 */
import { Router } from "express";
import catchAsync from "../../../utils/catchAsync.js";
import publicControllers from "../../../controllers/publicInfoController.js";
import publicInfoSchemas from "../../../validationSchemas/publicInfoSchemas.js";
import validate from "../../../middlewares/validate.js";
const router = Router();

router.get("/menu/:category", catchAsync(publicControllers.getItemsByCatetory));

//router.get("/calendar", validate(publicInfoSchemas.calendar), catchAsync(publicControllers.getCalendar))
router.get("/calendar/events", validate(publicInfoSchemas.calendar), catchAsync(publicControllers.getCalendarEvents))
router.get("/calendar/bookings", validate(publicInfoSchemas.calendar), catchAsync(publicControllers.getCalendarReservations));

router.post("/review/submit", validate(publicInfoSchemas.review), catchAsync(publicControllers.submitReview))
router.post("/bookings/submit", validate(publicInfoSchemas.reseration), catchAsync(publicControllers.submitBooking));
router.post("/jobapp/submit", validate(publicInfoSchemas.jobApp), catchAsync(publicControllers.submitJobApp));

export default router;