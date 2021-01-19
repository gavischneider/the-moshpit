import authReducer from "./authReducer";
import { AuthState } from "./authReducer";
import postReducer from "./postReducer";
import { PostState } from "./postReducer";
import publisherReducer from "./publisherReducer";
import { PublisherState } from "./publisherReducer";

import { combineReducers } from "redux";

export type InitialState = {
  auth: AuthState;
  post: PostState;
  publishers: PublisherState;
};

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  publishers: publisherReducer,
});

export default rootReducer;
