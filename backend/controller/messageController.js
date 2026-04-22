import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Conversation from "../model/conversationModel.js";
import CouponCode from "../model/couponCodeModel.js";
import Event from "../model/eventModel.js";
import MessageModel from "../model/messageModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";

export const createNewMessage = catchAsyncErrors(async (req, res, next) => {
  const messageData = req.body;
  if (req.files) {
    const files = req.files;
    const imageUrl = files.map((file) => `${file.fileName}`);
    messageData.images = imageUrl;
  }
  messageData.conversationId = req.body.conversationId;
  messageData.sender = req.body.sender;
  messageData.text = req.body.text;

  const message = new MessageModel({
    conversationId: messageData.conversationId,
    text: messageData.text,
    sender: messageData.sender,
    images: messageData.images ? messageData.images : undefined,
  });

  await message.save();

  res.status(201).json({
    success: true,
    message,
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await MessageModel.find({
    conversationId: req.params.id,
  });
  res.status(201).json({
    success: true,
    messages,
  });
});
