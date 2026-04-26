import express from "express";
import upload from "../multer.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
  isShopAuthenticated,
} from "../middleware/auth.js";
import {
  createWithdrawRequest,
  getAllWithdrawRequest,
  updateWithdrawRequest,
} from "../controller/withdrawController.js";

const withdrawRoute = express.Router();

withdrawRoute.post(
  "/create-withdraw-request",
  isShopAuthenticated,
  createWithdrawRequest,
);
withdrawRoute.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  getAllWithdrawRequest,
);
withdrawRoute.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  updateWithdrawRequest,
);

export default withdrawRoute;
