"use strict";

import { Router } from "express";

import analyticRoutes from "./admin/analyticRoutes.js"
import authRoutes from "./admin/authRoutes.js"
import bookingRoutes from "./admin/bookingRoutes.js"
import calendarRoutes from "./admin/calendarRoutes.js"
import managementRoutes from "./admin/menuManagementRoute.js"
import infoRoutes from "./public/infoRoutes.js"

const routes = Router();

//Use the imported routers
routes.use("/admin/analytic", analyticRoutes);
routes.use("/admin/auth", authRoutes);
routes.use("/admin/booking", bookingRoutes);
routes.use("/admin/calendar", calendarRoutes);
routes.use("/admin/menu", managementRoutes);
routes.use("/public", infoRoutes);

export default routes;


