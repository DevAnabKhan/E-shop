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
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import withdrawRoute from "./routes/withdrawRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://e-shop-5v54.vercel.app/", // <--- your frontend
    credentials: true, // <--- allow cookies to be sent
  }),
);
app.use("/uploads", express.static("../uploads"));
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

app.get("/", (req, res) => {
  res.send("E-Shop Backend is running 🚀");
});
app.use("/api/v2/user", userRouter);
app.use("/api/v2/shop", shopRouter);
app.use("/api/v2/product", productRoute);
app.use("/api/v2/event", eventRoute);
app.use("/api/v2/coupon", couponCodeRoute);
app.use("/api/v2/payment", paymentRoute);
app.use("/api/v2/order", orderRoute);
app.use("/api/v2/conversation", conversationRoute);
app.use("/api/v2/message", messageRoute);
app.use("/api/v2/withdraw", withdrawRoute);

app.use(error);
export default app;
