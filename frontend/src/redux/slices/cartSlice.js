// redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     cartLoading: true,
//   },
//   reducers: {
//     loadCartRequest: (state) => {
//       state.cartLoading = true;
//     },
//     addToCart: (state, action) => {
//       state.cartLoading = false;
//       const item = action.payload;
//      const isItemExist = state.cart.find((i) => i._id === item._id);
//       if (isItemExist) {
//         return {
//           ...state,
//           cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//         };
//       } else {
//         return {
//           ...state,
//           cart: [...state.cart, item],
//         };
//       }
//     },

//    removeFromCart: (state, action) => {
//   state.cartLoading = false;
//   state.cart = state.cart.filter((i) => i._id !== action.payload);
// }
//   },
// });

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartLoading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) => (i._id === item._id ? item : i));
      } else {
        state.cart.push(item);
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
