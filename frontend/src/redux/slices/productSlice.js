// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productLoading: true,
    product: null,
    error: null,
    success: false,
    fetchLoading: false,
    fetchError: null,
    fetchSuccess: false,
    allProducts: [],
    deleteError: false,
    deleteLoading: false,
    message: null,
    userProductError: null,
    allUserProducts: [],
    isUserProductsLoading: false,
  },
  reducers: {
    loadProductRequest: (state) => {
      state.productLoading = true;
    },
    loadProductSuccess: (state, action) => {
      state.productLoading = false;
      state.product = action.payload;
      state.success = true;
    },
    loadProductFail: (state, action) => {
      state.productLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    fetchAllProductsRequest: (state) => {
      state.fetchLoading = true;
    },
    fetchAllProductsSuccess: (state, action) => {
      state.fetchLoading = false;
      state.allProducts = action.payload;
    },
    fetchAllProductsFail: (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
    deleteProductRequest: (state) => {
      state.deleteLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.deleteLoading = false;
      state.message = action.payload;
      state.allProducts = state.allProducts.filter(
        (product) => product._id !== action.payload.id,
      );
    },
    deleteProductFail: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },

    //-----for user
    getAllProductsForUserRequest: (state) => {
      state.isUserProductsLoading = true;
    },
    getAllProductsForUserSuccess: (state, action) => {
      state.isUserProductsLoading = false;
      state.allUserProducts = action.payload;
    },
    getAllProductsForUserFailed: (state, action) => {
      state.isUserProductsLoading = false;
      state.userProductError = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadProductRequest,
  loadProductSuccess,
  loadProductFail,
  fetchAllProductsFail,
  fetchAllProductsRequest,
  fetchAllProductsSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsForUserRequest,
  getAllProductsForUserSuccess,
  getAllProductsForUserFailed,
  clearError,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
