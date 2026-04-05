import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { shopReducer } from "./slices/shopSlice";
import { productReducer } from "./slices/productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
  },
});

export default store;
