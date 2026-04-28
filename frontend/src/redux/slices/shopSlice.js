// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    isShopAuthenticated: false,
    shopLoading: true,
    shop: null,
    error: null,
    adminShops: null,
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
    getAllShopRequest: (state) => {
      state.shopLoading = true;
    },
    getAllShopSuccess: (state, action) => {
      state.shopLoading = false;
      state.adminShops = action.payload;
    },
    getAllShopFail: (state, action) => {
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
  getAllShopRequest,
  getAllShopSuccess,
  getAllShopFail,
  clearError,
  shopLogout,
} = shopSlice.actions;

export const shopReducer = shopSlice.reducer;
