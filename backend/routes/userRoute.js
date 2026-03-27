import express from "express";
import upload from "../multer.js";
import {
  activateUserAccount,
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), registerUser);
userRouter.post("/activation", activateUserAccount);
userRouter.post("/login-user", loginUser);
userRouter.get("/getuser", isAuthenticated, getUser);
userRouter.get("/logout", isAuthenticated, logoutUser);

export default userRouter;
