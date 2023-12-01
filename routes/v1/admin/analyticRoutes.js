"use strict";

import { Router } from "express";

const router = Router();

/*
    TODO: ### functions ###

- [ ] implement query functions for analytics
->  metrics: sales | reviews | bookings | visitors
->  month
- [ ] implement clever range based delete function
- [ ] middleware
- [ ] remove "analytics" from all routes

*/

router.get("analytic") //query based
router.delete("analytics/ratings/:submissionID");
router.delete("analytics/sales")// might get complicated

export default router