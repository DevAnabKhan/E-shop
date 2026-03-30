// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    isShopAuthenticated: false,
    shopLoading: false,
    shop: null,
    error: null,
  },
  reducers: {
    loadShopRequest: (state) => {
      state.shopLoading = true;
    },
    loadShopSuccess: (state, action) => {
      state.isShopAuthenticated = true;
      state.shopLoading = false;
      state.shop = action.payload;
    },
    loadShopFail: (state, action) => {
      state.isShopAuthenticated = false;
      state.shopLoading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loadShopRequest, loadShopSuccess, loadShopFail, clearError } =
  shopSlice.actions;

export const shopReducer = shopSlice.reducer;
