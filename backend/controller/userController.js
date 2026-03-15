import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";
import fs from "fs";

export const userController = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    if (req.file) {
      fs.unlinkSync(path.join("uploads", req.file.filename));
    }
    console.log("already exist error ");
    return next(new ErrorHandler("User already exists", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Avatar image is required", 400));
  }

  const filename = req.file.filename;
  const fileUrl = `/uploads/${req.file.filename}`;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: req.file.filename,
      url: fileUrl,
    },
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});
