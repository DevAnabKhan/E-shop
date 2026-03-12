import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";

export const userController = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = await User.create({
    name,
    email,
    password,
    avatar: fileUrl,
  });

  res.status(201).json({
    success: true,
    user,
  });
});
