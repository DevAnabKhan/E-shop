import express from "express";
import upload from "../multer.js";
import {
  activateUserAccount,
  userController,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), userController);
userRouter.post("/activation", activateUserAccount);

export default userRouter;
