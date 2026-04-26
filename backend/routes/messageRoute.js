import express from "express";
import upload from "../multer.js";
import {
  createNewMessage,
  getAllMessages,
} from "../controller/messageController.js";

const messageRoute = express.Router();

messageRoute.post(
  "/create-new-message",
  upload.single("images"),
  createNewMessage,
);
messageRoute.get("/get-all-messages/:id", getAllMessages);

export default messageRoute;
