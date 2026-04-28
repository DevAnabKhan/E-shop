import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/paymentController.js";
const paymentRoute = express.Router();
paymentRoute.post("/process", processPayment);
paymentRoute.get("/stripeapikey", sendStripeApiKey);

export default paymentRoute;
