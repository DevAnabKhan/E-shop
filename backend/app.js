import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import shopRouter from "./routes/shopRoute.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import eventRoute from "./routes/eventRoute.js";
import couponCodeRoute from "./routes/couponCodeRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // <--- your frontend
    credentials: true, // <--- allow cookies to be sent
  }),
);
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "./config/.env",
  });
}

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use("/api/v2/user", userRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/product", productRoute);
app.use("/api/v2/event", eventRoute);
app.use("/api/v2/coupon", couponCodeRoute);

app.use(error);
export default app;
