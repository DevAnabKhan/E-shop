import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Conversation from "../model/conversationModel.js";
import CouponCode from "../model/couponCodeModel.js";
import Event from "../model/eventModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";

export const createConversation = catchAsyncErrors(async (req, res, next) => {
  const { groupTitle, userId, shopId } = req.body;
  const conversationExit = await Conversation.findOne({ groupTitle });

  if (conversationExit) {
    const conversation = conversationExit;
    res.status(201).json({
      success: true,
      message: "Success",
      conversation,
    });
  } else {
    const conversation = await Conversation.create({
      members: [userId, shopId],
      groupTitle: groupTitle,
    });

    res.status(201).json({
      success: true,
      message: "Success",
      conversation,
    });
  }
});

export const getAllConversation = catchAsyncErrors(async (req, res, next) => {
  const conversations = await Conversation.find({
    members: {
      $in: [req.params.shopId],
    },
  }).sort({ updatedAt: -1, createdAt: -1 });

  res.status(201).json({
    success: true,
    message: "Success",
    conversations,
  });
});

export const updateLastMessage = catchAsyncErrors(async (req, res, next) => {
  const { lastMessage, lastMessageId } = req.body;

  const conversation = await Conversation.findByIdAndUpdate(
    req.params.id,
    {
      lastMessage,
      lastMessageId,
    },
    { new: true },
  );

  res.status(201).json({
    success: true,
    message: "Success",
    conversation,
  });
});

export const getAllUserConversation = catchAsyncErrors(
  async (req, res, next) => {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({
      success: true,
      message: "Success",
      conversations,
    });
  },
);
