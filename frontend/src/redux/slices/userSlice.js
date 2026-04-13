// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    updateUserLoading: false,
    updateUserAddressLoading: false,
    successMessage: null,
  },
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.updateUserLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.updateUserLoading = false;
      state.user = action.payload;
    },
    updateUserFail: (state, action) => {
      state.updateUserLoading = false;
      state.error = action.payload;
    },
    updateUserAddressRequest: (state) => {
      state.updateUserAddressLoading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.updateUserAddressLoading = false;
      state.user = action.payload;
      state.successMessage = action.payload.message;
    },
    updateUserAddressFail: (state, action) => {
      state.updateUserAddressLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    deleteUserAddressRequest: (state) => {
      state.updateUserAddressLoading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.updateUserAddressLoading = false;
      state.user = action.payload;
      state.successMessage = action.payload.message;
    },
    deleteUserAddressFail: (state, action) => {
      state.updateUserAddressLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearError,
  updateUserRequest,
  updateUserFail,
  updateUserSuccess,
  updateUserAddressRequest,
  updateUserAddressFail,
  updateUserAddressSuccess,
  deleteUserAddressRequest,
  deleteUserAddressFail,
  deleteUserAddressSuccess,
  clearMessage,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
