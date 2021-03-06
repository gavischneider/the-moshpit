import { Reducer } from "react";
import { Publisher } from "../../../../shared/Publisher";
import { User } from "../../../../shared/User";
import {
  AuthDispatchTypes,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOADING,
  REMOVE_FEED_FROM_USER_STATE,
  ADD_FEED_TO_USER_STATE,
} from "../actions/authActionsTypes";

interface UserRes {
  user: User;
  status: number;
  authenticated: boolean;
}

export interface AuthState {
  loading: boolean;
  user: UserRes | undefined;
  authenticated: boolean;
}

const defaultState: AuthState = {
  loading: false,
  user: undefined,
  authenticated: false,
};

const authReducer: Reducer<AuthState, AuthDispatchTypes> = (
  state: AuthState = defaultState,
  action: AuthDispatchTypes
) => {
  switch (action.type) {
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        user: undefined,
        authenticated: false,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
        user: undefined,
        authenticated: false,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.payload,
      };
    // case ADD_FEED_TO_USER_STATE:
    //   return {
    //     ...state,
    //     loading: false,
    //     authenticated: true,
    //     user: action.payload,
    //   };
    // case REMOVE_FEED_FROM_USER_STATE:
    //   return {
    //     ...state,
    //     loading: false,
    //     authenticated: true,
    //     user: action.payload,
    //   };
    default:
      return state;
  }
};

export default authReducer;
