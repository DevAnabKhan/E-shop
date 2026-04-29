import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Event from "../model/eventModel.js";
import Shop from "../model/shopModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

export const createEvent = catchAsyncErrors(async (req, res, next) => {
  const shopId = req.body.shopId;
  const shop = await Shop.findById(shopId);

  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler("Please upload at least one image", 400));
  }

  if (!shop) {
    return next(new ErrorHandler("Shop Id is invalid", 400));
  }

  const files = req.files;

  // const imageUrls = files.map((file) => ({
  //   url: file.filename,
  // }));
  const imageUrls = await Promise.all(
    // ← changed
    req.files.map(async (file) => {
      const result = await uploadToCloudinary(file.buffer, "e-shop");
      return { public_id: result.public_id, url: result.secure_url };
    }),
  );

  const eventData = req.body;
  eventData.images = imageUrls;
  eventData.shop = shop;

  const event = await Event.create(eventData);

  res.status(201).json({
    success: true,
    message: "Success",
    event,
  });
});

export const getAllEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find({ shopId: req.params.id });

  res.status(201).json({
    success: true,
    message: "Success",
    events,
  });
});

export const deleteShopEvent = catchAsyncErrors(async (req, res, next) => {
  const eventId = req.params.id;
  const eventData = await Event.findById(eventId);
  console.log(eventData);

  // eventData.images.forEach((image) => {
  //   const filename = image.url; // ✅ correct
  //   const filePath = `uploads/${filename}`;

  //   fs.unlink(filePath, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // });
  for (const image of eventData.images) {
    await deleteFromCloudinary(image.public_id); // ← changed
  }

  const event = await Event.findByIdAndDelete(eventId);

  if (event) {
    return next(new ErrorHandler("Product not found with this id", 500));
  }

  res.status(201).json({
    success: true,
    message: "Event deleted successfully",
  });
});

export const getAllEventsForUser = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();

  res.status(201).json({
    success: true,
    message: "Success",
    events,
  });
});

export const getAllAdminEvent = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    events,
  });
});
