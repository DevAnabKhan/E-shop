import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Order from "../model/orderModel.js";
import Shop from "../model/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { updateShopInfo } from "./shopController.js";

export const createOrder = catchAsyncErrors(async (req, res, next) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

  const shopItemsMap = new Map();
  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  const orders = [];
  for (const [shopId, items] of shopItemsMap) {
    const order = await Order.create({
      cart: items,
      shippingAddress,
      user,
      totalPrice,
      paymentInfo,
    });
    orders.push(order);
  }

  res.status(201).json({
    success: true,
    orders,
  });
});

export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ "user._id": req.params.userId }).sort({
    createdAt: -1,
  });

  res.status(201).json({
    success: true,
    orders,
  });
});

export const getAllOrdersOfShop = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    cart: {
      $elemMatch: {
        shopId: req.params.shopId,
      },
    },
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 400));
  }

  if (req.body.status === "Transferred to delivery partner") {
    order.cart.forEach(async (o) => {
      await updateOrderStatus(o._id, o.qty);
    });
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
    order.paymentInfo.status = "Succeeded";
    const serviceCharge = order.totalPrice * 0.1;
    await updateShopInfo(order.totalPrice - serviceCharge);
  }

  await order.save({ validateBeforeSave: false });
  async function updateOrder(id, qty) {
    const product = await ProductCard.findById(id);
    product.stock -= qty;
    product.sold_out += qty;
    await product.save({ validateBeforeSave: false });
  }

  async function updateShopInfo(amount) {
    const shop = await Shop.findById(req.shop.id);
    shop.availableBalance = amount;
    await shop.save();
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const orderRefund = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 400));
  }

  order.status = req.body.status;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
});

export const orderRefundSuccess = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 400));
  }

  order.status = req.body.status;
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: " Order refund Successfully",
  });
  if (req.body.status === "Refund Success") {
    order.cart.forEach(async (o) => {
      await updateOrderStatus(o._id, o.qty);
    });
  }

  async function updateOrder(id, qty) {
    const product = await ProductCard.findById(id);
    product.stock += qty;
    product.sold_out -= qty;
    await product.save({ validateBeforeSave: false });
  }
});

export const getAllAdminOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ deliveredAt: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});
