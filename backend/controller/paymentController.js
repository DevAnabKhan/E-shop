import Stripe from "stripe";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

// CREATE PAYMENT INTENT
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      project: "Ecommerce App",
    },
  });

  res.status(201).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// GET STRIPE API KEY
export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApikey: process.env.STRIPE_API_KEY,
  });
});
