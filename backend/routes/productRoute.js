import express from "express";
import upload from "../multer.js";
import {
  createProduct,
  deleteShopProduct,
  getAllProducts,
  getAllProductsForUser,
} from "../controller/productController.js";
import { isShopAuthenticated } from "../middleware/auth.js";

const productRoute = express.Router();

productRoute.post("/create-product", upload.array("images"), createProduct);
productRoute.get("/get-all-products-shop/:id", getAllProducts);
productRoute.get("/get-all-products", getAllProductsForUser);
productRoute.delete(
  "/delete-shop-product/:id",
  isShopAuthenticated,
  deleteShopProduct,
);

export default productRoute;
