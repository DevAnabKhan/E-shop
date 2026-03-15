// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from "../slices/userSlice";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/getuser`);

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      loadUserFail(error.response?.data?.message || "Something went wrong"),
    );
  }
};
