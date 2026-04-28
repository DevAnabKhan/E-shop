// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: true,
    orders: null,
    shopOrders: null,
    error: null,
    success: false,
    adminOrders: null,
  },
  reducers: {
    getAllOrdersForUserRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersForUserSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getAllOrdersForUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrdersForShopRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersForShopSuccess: (state, action) => {
      state.loading = false;
      state.shopOrders = action.payload;
    },
    getAllOrdersForShopFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrdersForAdminRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersForAdminSuccess: (state, action) => {
      state.loading = false;
      state.adminOrders = action.payload;
    },
    getAllOrdersForAdminFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getAllOrdersForUserRequest,
  getAllOrdersForUserSuccess,
  getAllOrdersForUserFailed,
  getAllOrdersForShopRequest,
  getAllOrdersForShopSuccess,
  getAllOrdersForShopFailed,
  getAllOrdersForAdminRequest,
  getAllOrdersForAdminSuccess,
  getAllOrdersForAdminFailed,
  clearError,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
