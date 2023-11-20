import {Router} from ("express");
const router = Router();

router.get("/menu/:category");
router.get("/calendar/events/:month")
router.get("/calendar/bookings");

router.post("/bookings/submit")
router.post("/jobapp/submit")
router.post("/review/submit")

export default router;