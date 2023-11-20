import { Router } from "express";

const router = Router();

/*
    TODO: ### functions ###

- [ ] implement query functions for analytics
->  metrics: sales | reviews | bookings | visitors
->  month
- [ ] implement clever range based delete function
- [ ] middleware

*/

router.get("analytics") //query based
router.delete("analytics/ratings/:submissionID");
router.delete("analytics/sales")// might get complicated