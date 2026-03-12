import express from "express";
import upload from "../multer.js";
import { userController } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/create-user", upload.single("file"), userController);

export default userRouter;
