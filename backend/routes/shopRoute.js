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
} from "../controller/shopController.js";
import { isShopAuthenticated } from "../middleware/auth.js";

const shopRouter = express.Router();

shopRouter.post("/create-shop", upload.single("file"), registerSeller);
shopRouter.post("/shop-activation", activateShopAccount);
shopRouter.post("/login-shop", loginShop);
shopRouter.get("/get-shop", isShopAuthenticated, getShop);
shopRouter.get("/logout-shop", logoutShop);
shopRouter.get("/get-shop-info/:id", isShopAuthenticated, getShopInfo);
shopRouter.put(
  "/update-shop-avatar",
  isShopAuthenticated,
  upload.single("file"),
  updateShopAvatar,
);
shopRouter.put("/update-shop-info", isShopAuthenticated, updateShopInfo);
export default shopRouter;
