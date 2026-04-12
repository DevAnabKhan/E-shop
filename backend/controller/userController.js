import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import jwtToken from "../utils/jwtToken.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
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

  const user = {
    name,
    email,
    password,
    avatar: {
      public_id: req.file.filename,
      url: fileUrl,
    },
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:5173/activation/${activationToken}`;
  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click the link to activate your account: ${activationUrl}`,
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
    message: `Please check your email: ${user.email} to activate your account`,
  });
});

export const activateUserAccount = catchAsyncErrors(async (req, res, next) => {
  const { activation_token } = req.body;

  let new_user;
  try {
    new_user = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
  } catch (e) {
    return next(new ErrorHandler("Invalid or expired activation token", 400));
  }

  const { name, email, password, avatar } = new_user;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  jwtToken(user, 201, res);
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide all fields!", 400));
  }

  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return next(new ErrorHandler("User doestn't exists", 400));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(
      new ErrorHandler("Please provide the correct information", 400),
    );
  }

  jwtToken(user, 201, res);
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User doestn't exists", 400));
  }

  res.status(201).json({
    success: true,
    message: "Success",
    user,
  });
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  // ✅ Find by authenticated user's ID, not by email
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(
      new ErrorHandler("Please provide the correct information", 400),
    );
  }

  // ✅ Now safely update all fields
  user.name = name;
  user.email = email;
  user.phoneNumber = phoneNumber;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
// export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
//   console.log("req.body:", req.body);
//   const { name, email, password, phoneNumber } = req.body;
//   console.log("phonenumber", phoneNumber);
//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     console.log("no user exist error ");
//     return next(new ErrorHandler("User not exists", 400));
//   }

//   const isPasswordValid = await user.comparePassword(password);

//   if (!isPasswordValid) {
//     return next(
//       new ErrorHandler("Please provide the correct information", 400),
//     );
//   }

//   user.name = name;
//   user.email = email;
//   user.phoneNumber = phoneNumber;

//   await user.save();

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

export const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const existUser = await User.findById(req.user.id);

  // ✅ Correctly delete old avatar using the object structure
  if (existUser.avatar && existUser.avatar.public_id) {
    const existAvatarPath = `uploads/${existUser.avatar.public_id}`;
    if (fs.existsSync(existAvatarPath)) {
      fs.unlinkSync(existAvatarPath);
    }
  }

  // ✅ Save with same structure as register/login
  const fileUrl = {
    public_id: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: fileUrl },
    { new: true },
  );

  res.status(200).json({
    success: true,
    user,
  });
});
