import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import Shop from "../model/shopModel.js";
import sendShopToken from "../utils/shopToken.js";

export const registerSeller = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const sellerEmail = await Shop.findOne({ email });
  if (sellerEmail) {
    if (req.file) {
      fs.unlinkSync(path.join("uploads", req.file.filename));
    }
    return next(new ErrorHandler("Seller already exists", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Avatar image is required", 400));
  }

  const filename = req.file.filename;
  const fileUrl = `/uploads/${req.file.filename}`;

  const seller = {
    name: req.body.name,
    email,
    password: req.body.password,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    zipCode: req.body.zipCode,
    avatar: {
      public_id: req.file.filename,
      url: fileUrl,
    },
  };

  const activationToken = createActivationToken(seller);

  const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
  try {
    await sendMail({
      email: seller.email,
      subject: "Activate your shop",
      message: `Hello ${seller.name}, please click the link to activate your shop: ${activationUrl}`,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }

  // const newUser = await User.create(user);

  // res.status(201).json({
  //   success: true,
  //   message: "User registered successfully",
  //   user: newUser,
  // });

  res.status(200).json({
    success: true,
    message: `Please check your email: ${seller.email} to activate your shop`,
  });
});

export const activateShopAccount = catchAsyncErrors(async (req, res, next) => {
  const { activation_token } = req.body;

  let new_seller;
  try {
    new_seller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
  } catch (e) {
    return next(new ErrorHandler("Invalid or expired activation token", 400));
  }

  const { name, email, password, avatar, address, zipCode, phoneNumber } =
    new_seller;

  const seller = await Shop.findOne({ email });

  if (seller) {
    return next(new ErrorHandler("Seller already exists", 400));
  }

  const shop = await Shop.create({
    name,
    email,
    password,
    avatar,
    zipCode,
    address,
    phoneNumber,
  });

  sendShopToken(shop, 201, res);
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

export const loginShop = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide all fields!", 400));
  }

  const shop = await Shop.findOne({ email }).select("password");

  if (!shop) {
    return next(new ErrorHandler("Shop doestn't exists", 400));
  }

  const isPasswordValid = await shop.comparePassword(password);

  if (!isPasswordValid) {
    return next(
      new ErrorHandler("Please provide the correct information", 400),
    );
  }

  sendShopToken(shop, 201, res);
});

export const getShop = catchAsyncErrors(async (req, res, next) => {
  console.log(req.shop);
  const shop = await Shop.findById(req.shop._id);

  if (!shop) {
    return next(new ErrorHandler("Shop doestn't exists", 400));
  }

  res.status(201).json({
    success: true,
    message: "Success",
    shop,
  });
});

export const getShopInfo = catchAsyncErrors(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(new ErrorHandler("Shop doestn't exists", 400));
  }

  res.status(201).json({
    success: true,
    message: "Success",
    shop,
  });
});

export const logoutShop = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("seller_token", {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Logged out shop successfully",
  });
});

export const updateShopAvatar = catchAsyncErrors(async (req, res, next) => {
  const existShop = await Shop.findById(req.shop._id);

  // ✅ Correctly delete old avatar using the object structure
  if (existShop.avatar && existShop.avatar.public_id) {
    const existAvatarPath = `uploads/${existShop.avatar.public_id}`;
    if (fs.existsSync(existAvatarPath)) {
      fs.unlinkSync(existAvatarPath);
    }
  }

  // ✅ Save with same structure as register/login
  const fileUrl = {
    public_id: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  };

  const shop = await Shop.findByIdAndUpdate(
    req.shop._id,
    { avatar: fileUrl },
    { new: true },
  );

  res.status(200).json({
    success: true,
    shop,
  });
});

export const updateShopInfo = catchAsyncErrors(async (req, res, next) => {
  const { name, description, address, phoneNumber, zipCode } = req.body;

  const shop = await Shop.findById(req.shop._id);

  if (!shop) {
    return next(new ErrorHandler("Shop not found", 400));
  }

  shop.name = name;
  shop.description = description;
  shop.address = address;
  shop.zipCode = Number(zipCode); // ✅ convert to number
  shop.phoneNumber = Number(phoneNumber); // ✅ convert to number

  await shop.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, shop });
});
