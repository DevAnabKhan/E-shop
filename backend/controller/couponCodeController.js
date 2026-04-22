import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import CouponCode from "../model/couponCodeModel.js";
import Event from "../model/eventModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";

export const createCoupon = catchAsyncErrors(async (req, res, next) => {
  const name = req.body.name;
  console.log(req.body.name);
  const couponCode = await CouponCode.findOne({ name });

  if (couponCode) {
    return next(new ErrorHandler("Coupon code already exist", 400));
  }

  const coupon = await CouponCode.create(req.body);
  console.log(coupon);
  res.status(201).json({
    success: true,
    message: "Success",
    coupon,
  });
});

export const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const couponCodes = await CouponCode.find({ shopId: req.params.id });

  res.status(201).json({
    success: true,
    message: "Success",
    couponCodes,
  });
});

export const deleteCouponCode = catchAsyncErrors(async (req, res, next) => {
  const couponId = req.params.id;
  const couponData = await CouponCode.findById(couponId);
  console.log(couponData);

  const coupon = await CouponCode.findByIdAndDelete(couponId);

  if (!coupon) {
    return next(new ErrorHandler("Coupon Code not found with this id", 500));
  }

  res.status(201).json({
    success: true,
    message: "Coupon Code deleted successfully",
  });
});

export const getCouponValue = catchAsyncErrors(async (req, res, next) => {
  const couponCode = await CouponCode.findOne({ name: req.params.name });

  res.status(201).json({
    success: true,
    couponCode,
  });
});
