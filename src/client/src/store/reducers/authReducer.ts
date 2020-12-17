import { User } from "../../../../shared/User";
import {
  AuthDispatchTypes,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOADING,
} from "../actions/authActionsTypes";

interface UserRes {
  user: User;
  status: number;
  authenticated: boolean;
}

export interface AuthState {
  loading: boolean;
  user?: UserRes;
  authenticated: boolean;
}

const defaultState: AuthState = {
  loading: false,
  authenticated: false,
};

const authReducer = (
  state: AuthState = defaultState,
  action: AuthDispatchTypes
): AuthState => {
  switch (action.type) {
    case USER_FAIL:
      return {
        loading: false,
        authenticated: false,
      };
    case USER_LOADING:
      return {
        loading: true,
        authenticated: false,
      };
    case USER_SUCCESS:
      return {
        loading: false,
        authenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

// const authReducer = (state: AuthState = authState, action: any): AuthState => {
//   switch (action.type) {
//     case "SET_USER":
//       console.log("authReducer, action: GET_USER");
//       return {
//         ...state,
//         user: {
//           ...action.user,
//         },
//         status: action.status,
//         authenticated: action.authenticated,
//       };
//     case "GET_USER_ERROR":
//       console.log("GET_USER_ERROR: " + action.error);
//       return state;
//     default:
//       console.log("Default");
//       return state;
//   }
// };

export default authReducer;
