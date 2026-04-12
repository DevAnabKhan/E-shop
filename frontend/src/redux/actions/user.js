// redux/actions/user.js
import axios from "axios";
import { server } from "../../server";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
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

export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch(updateUserRequest());
      console.log("data comming", email, phoneNumber, password, name);
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(updateUserSuccess(data.user));
    } catch (error) {
      dispatch(
        updateUserFail(error.response?.data?.message || "Something went wrong"),
      );
    }
  };
