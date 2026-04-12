import { addToCart, removeFromCart } from "../slices/cartSlice";

export const addtoCart = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};

export const removefromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};
