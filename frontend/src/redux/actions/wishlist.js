import { addToWishlist, removeFromWishlist } from "../slices/wishlistSlice";

export const addtoWishlist = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist),
  );
};

export const removefromWishlist = (id) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(id));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist),
  );
};
