import express from "express";
import upload from "../multer.js";
import {
  createProduct,
  deleteShopProduct,
  getAllProducts,
  getAllProductsForUser,
  createNewReview,
  getAllAdminProduct,
} from "../controller/productController.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
  isShopAuthenticated,
} from "../middleware/auth.js";

const productRoute = express.Router();

productRoute.post("/create-product", upload.array("images"), createProduct);
productRoute.get("/get-all-products-shop/:id", getAllProducts);
productRoute.get("/get-all-products", getAllProductsForUser);
productRoute.put("/create-new-review", isAuthenticated, createNewReview);
productRoute.delete(
  "/delete-shop-product/:id",
  isShopAuthenticated,
  deleteShopProduct,
);
productRoute.get(
  "/get-all-admin-products",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  getAllAdminProduct,
);

export default productRoute;
