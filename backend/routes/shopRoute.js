import express from "express";
import upload from "../multer.js";
import {
  registerSeller,
  activateShopAccount,
  loginShop,
  getShop,
  logoutShop,
  getShopInfo,
  updateShopAvatar,
  updateShopInfo,
  getAllAdminShop,
  deleteShop,
  updatePaymentMethod,
  deleteWithdrawMethod,
} from "../controller/shopController.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
  isShopAuthenticated,
} from "../middleware/auth.js";

const shopRouter = express.Router();

shopRouter.post("/create-shop", upload.single("file"), registerSeller);
shopRouter.post("/shop-activation", activateShopAccount);
shopRouter.post("/login-shop", loginShop);
shopRouter.get("/get-shop", isShopAuthenticated, getShop);
shopRouter.get(
  "/get-all-admin-shops",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  getAllAdminShop,
);
shopRouter.get("/logout-shop", logoutShop);
shopRouter.get("/get-shop-info/:id", isShopAuthenticated, getShopInfo);
shopRouter.put(
  "/update-shop-avatar",
  isShopAuthenticated,
  upload.single("file"),
  updateShopAvatar,
);
shopRouter.put("/update-shop-info", isShopAuthenticated, updateShopInfo);
shopRouter.put(
  "/update-payment-method",
  isShopAuthenticated,
  updatePaymentMethod,
);
shopRouter.delete(
  "/delete-shop/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  deleteShop,
);
shopRouter.delete(
  "/delete-withdraw-method/:id",
  isAuthenticated,
  deleteWithdrawMethod,
);
export default shopRouter;
