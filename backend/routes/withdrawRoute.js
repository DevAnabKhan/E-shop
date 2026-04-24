import express from "express";
import upload from "../multer.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
  isShopAuthenticated,
} from "../middleware/auth.js";
import { createWithdrawRequest } from "../controller/withdrawController.js";

const withdrawRoute = express.Router();

withdrawRoute.delete(
  "/create-withdraw-request",
  isShopAuthenticated,
  createWithdrawRequest,
);

export default withdrawRoute;
