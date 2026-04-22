import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllOrdersOfShop,
  orderRefund,
  updateOrderStatus,
  orderRefundSuccess,
  getAllAdminOrders,
} from "../controller/orderController.js";
import {
  isAdminAuthenticated,
  isAuthenticated,
  isShopAuthenticated,
} from "../middleware/auth.js";

const orderRoute = express.Router();
orderRoute.post("/create-order", createOrder);
orderRoute.get("/get-all-orders/:userId", getAllOrders);
orderRoute.get("/get-all-shop-orders/:shopId", getAllOrdersOfShop);
orderRoute.get(
  "/get-all-admin-orders",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  getAllAdminOrders,
);
orderRoute.put("/order-refund/:id", orderRefund);
orderRoute.put("/order-refund-success/:id", orderRefundSuccess);
orderRoute.put(
  "/update-order-status/:id",
  isShopAuthenticated,
  updateOrderStatus,
);

export default orderRoute;
