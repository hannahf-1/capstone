"use strict";

import { Router } from "express"

const router = Router();

router.get("getCalendarEvents") //query?
router.get("getBookedEvents") //query?
router.get("getAllEvents")  //query?

router.post("createEvent") //body

export default router;