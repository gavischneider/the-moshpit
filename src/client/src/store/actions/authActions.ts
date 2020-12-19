import axios from "axios";
import { Dispatch } from "redux";
import {
  AuthDispatchTypes,
  USER_LOADING,
  USER_FAIL,
  USER_SUCCESS,
} from "./authActionsTypes";

// export const setUser = () => {
//   return (dispatch: any, getState: any) => {
//     // Make async call to backend
//     axios({
//       method: "GET",
//       url: "auth/login/success",
//     })
//       .then((res: any) => {
//         console.log("I JUST DISPATCHED THIS USER: ");
//         console.log(res.data.user);
//         dispatch({
//           type: "GET_USER",
//           user: res.data.user,
//           status: res.status,
//           authenticated: res.authenticated,
//         });

//         //dispatch({ type: "GET_USER", user: {}, status: res.status });
//       })
//       .catch((error) => {
//         //   setAuthenticated(false);
//         dispatch({ type: "GET_USER_ERROR", error });
//       });
//   };
// };

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
