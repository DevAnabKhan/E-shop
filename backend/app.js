import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "./config/.env",
  });
}

app.use("/api/v2/user", userRouter);

app.use(error);
export default app;
