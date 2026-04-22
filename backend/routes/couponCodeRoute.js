import express from "express";
import { isShopAuthenticated } from "../middleware/auth.js";
import {
  createCoupon,
  deleteCouponCode,
  getAllCoupons,
  getCouponValue,
} from "../controller/couponCodeController.js";

const couponCodeRoute = express.Router();

couponCodeRoute.post("/create-coupon", isShopAuthenticated, createCoupon);
couponCodeRoute.get("/get-all-coupon/:id", isShopAuthenticated, getAllCoupons);
couponCodeRoute.get("/get-coupon-value/:name", getCouponValue);
couponCodeRoute.delete(
  "/delete-coupon/:id",
  isShopAuthenticated,
  deleteCouponCode,
);

export default couponCodeRoute;
