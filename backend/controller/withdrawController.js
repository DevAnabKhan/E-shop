import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Widthdraw from "../model/withdrawModel.js";

import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import sendMail from "../utils/sendMail.js";
import Shop from "../model/shopModel.js";

export const createWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    const { amount } = req.body;
    const data = {
      shop: req.shop,
      amount,
    };

    try {
      await sendMail({
        email: req.shop.email,
        subject: "Withdraw request",
        message: `Hello ${req.shop.name}, your withdraw request of ${amount} is processing. It will take 3 to 7 days for processing`,
      });
      res.status(201).json({
        success: true,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
    const withdraw = await Widthdraw.create(data);
    const shop = await Shop.findById(req.shop._id);

    shop.availableBalance = shop.availableBalance - amount;
    await shop.save();

    res.status(201).json({
      success: true,
      message: "Success",
      withdraw,
    });
  },
);

export const updateWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    const { shopId } = req.body;

    const withdraw = await Widthdraw.findByIdAndUpdate(
      req.params.id,
      {
        status: "Succeed",
        updatedAt: Date.now(),
      },
      { new: true },
    );

    const shop = await Shop.findById(shopId);

    const transection = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };

    shop.transections = [...shop.transections, transection];
    await shop.save();
    try {
      await sendMail({
        email: shop.email,
        subject: "Payment confirmation",
        message: `Hello ${shop.name}, your withdraw request of ${withdraw.amount} is on the way. It will take 3 to 7 days for processing`,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
    res.status(200).json({
      success: true,
      withdraw,
    });
  },
);

export const getAllWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    const withdraws = await Widthdraw.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      withdraws,
    });
  },
);
