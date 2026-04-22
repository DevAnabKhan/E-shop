import express from "express";
import {
  createConversation,
  getAllConversation,
  getAllUserConversation,
  updateLastMessage,
} from "../controller/conversationController.js";
import { isAuthenticated, isShopAuthenticated } from "../middleware/auth.js";

const conversationRoute = express.Router();

conversationRoute.post("/create-new-conversation", createConversation);
conversationRoute.put("/update-last-message/:id", updateLastMessage);
conversationRoute.get(
  "/get-all-conversations-shop/:shopId",
  isShopAuthenticated,
  getAllConversation,
);
conversationRoute.get(
  "/get-all-conversations-user/:id",
  isAuthenticated,
  getAllUserConversation,
);

export default conversationRoute;
