import authReducer from "./authReducer";
import { AuthState } from "./authReducer";
import postReducer from "./postReducer";
import { PostState } from "./postReducer";

import { combineReducers } from "redux";

export type InitialState = {
  auth: AuthState;
  post: PostState;
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export default rootReducer;
