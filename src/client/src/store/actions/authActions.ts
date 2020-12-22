import axios from "axios";
import { Dispatch } from "redux";
import {
  AuthDispatchTypes,
  USER_LOADING,
  USER_FAIL,
  USER_SUCCESS,
} from "./authActionsTypes";

export const setUser = () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
  console.log("IN THE SETUSER FUNCTION");
  try {
    dispatch({
      type: USER_LOADING,
    });

    //http://localhost:5000/
    const res = await axios.get("auth/login/success");

    dispatch({
      type: USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
    });
  }
};
