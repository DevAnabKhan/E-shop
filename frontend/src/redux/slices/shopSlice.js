// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    isShopAuthenticated: false,
    shopLoading: true,
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
    shopLogout: (state) => {
      state.isShopAuthenticated = false;
      state.shop = null;
      state.shopLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadShopRequest,
  loadShopSuccess,
  loadShopFail,
  clearError,
  shopLogout,
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
