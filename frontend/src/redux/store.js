import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { shopReducer } from "./slices/shopSlice";
import { productReducer } from "./slices/productSlice";
import { eventReducer } from "./slices/eventSlice";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
import { orderReducer } from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default store;
