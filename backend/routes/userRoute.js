import express from "express";
import upload from "../multer.js";
import {
  activateUserAccount,
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  updateUserInfo,
  updateAvatar,
  updateUserAddress,
  deleteUserAddress,
  updateUserPassword,
  findUserInfo,
  getAllAdminUsers,
  deleteUser,
} from "../controller/userController.js";
import { isAdminAuthenticated, isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), registerUser);
userRouter.post("/activation", activateUserAccount);
userRouter.post("/login-user", loginUser);
userRouter.get("/getuser", isAuthenticated, getUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("file"),
  updateAvatar,
);
userRouter.put("/update-user-addresses", isAuthenticated, updateUserAddress);
userRouter.put("/update-user-password", isAuthenticated, updateUserPassword);
userRouter.get("/user-info/:id", findUserInfo);
userRouter.get(
  "/get-all-admin-users",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  getAllAdminUsers,
);
userRouter.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  deleteUserAddress,
);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  deleteUser,
);

export default userRouter;
