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
    clearError: (state) => {
      state.error = null;
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
} = userSlice.actions;

export const userReducer = userSlice.reducer;
