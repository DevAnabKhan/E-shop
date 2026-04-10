import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Product from "../model/productModel.js";
import Shop from "../model/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";

export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ shopId: req.params.id });

  res.status(201).json({
    success: true,
    message: "Success",
    products,
  });
});

export const deleteShopProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const productData = await Product.findById(productId);
  console.log(productData);

  productData.images.forEach((image) => {
    const filename = image.url;
    const filePath = `uploads/${filename}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  const product = await Product.findByIdAndDelete(productId);

  if (product) {
    return next(new ErrorHandler("Product not found with this id", 500));
  }

  res.status(201).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler("Please upload at least one image", 400));
  }

  if (!shop) {
    return next(new ErrorHandler("Shop Id is invalid", 400));
  }

  const files = req.files;

  const imageUrls = files.map((file) => ({
    url: file.filename, // ✅ FIXED
  }));

  const productData = req.body;
  productData.images = imageUrls;
  productData.shop = shop;

  const product = await Product.create(productData);

  res.status(201).json({
    success: true,
    message: "Success",
    product,
  });
});

export const getAllProductsForUser = catchAsyncErrors(
  async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      message: "Success",
      products,
    });
  },
);
