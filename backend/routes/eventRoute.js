import express from "express";
import upload from "../multer.js";
import { isShopAuthenticated } from "../middleware/auth.js";
import {
  createEvent,
  deleteShopEvent,
  getAllEvents,
  getAllEventsForUser,
} from "../controller/eventController.js";

const eventRoute = express.Router();

eventRoute.post("/create-event", upload.array("images"), createEvent);
eventRoute.get("/get-all-events/:id", getAllEvents);
eventRoute.get("/get-all-events", getAllEventsForUser);
eventRoute.delete(
  "/delete-shop-event/:id",
  isShopAuthenticated,
  deleteShopEvent,
);

export default eventRoute;
