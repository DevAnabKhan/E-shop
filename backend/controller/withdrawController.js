import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Widthdraw from "../model/withdrawModel.js";

import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";

export const createWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    const { amount } = req.body;
    const data = {
      shop: req.shop._id,
      amount,
    };
    const withdraw = await Widthdraw.create(data);

    res.status(201).json({
      success: true,
      message: "Success",
      withdraw,
    });
  },
);
