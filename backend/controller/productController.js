import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Product from "../model/productModel.js";
import Shop from "../model/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import Order from "../model/orderModel.js";

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
export const createNewReview = catchAsyncErrors(async (req, res, next) => {
  const { user, rating, comment, productId, orderId } = req.body;

  const product = await Product.findById(productId);

  const review = {
    user,
    rating: Number(rating),
    comment,
    productId,
  };

  const isReviewed = product.reviews.find(
    (rev) => rev.user._id === req.user._id,
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id === req.user._id) {
        rev.rating = rating;
        rev.comment = comment;
        rev.user = user;
      }
    });
  } else {
    product.reviews.push(review);
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        "cart.$[element].isReviewed": true,
      },
    },
    {
      arrayFilters: [{ "element._id": productId }],
      new: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Reviewed successfully",
  });
});

export const getAllAdminProduct = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    products,
  });
});
