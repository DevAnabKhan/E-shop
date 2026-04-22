import User from "../model/userModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import Shop from "../model/shopModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

export const isShopAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  console.log(seller_token);
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  req.shop = await Shop.findById(decoded.id);
  console.log("Shop from auth middleware:", req.shop);

  next();
});

export const isAdminAuthenticated = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} cannot access this resource!`, 403),
      );
    }

    next();
  };
};
