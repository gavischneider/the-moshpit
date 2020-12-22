import authReducer from "./authReducer";
import { AuthState } from "./authReducer";

import { combineReducers } from "redux";

export type InitialState = {
  auth: AuthState;
};

const rootReducer = combineReducers({
  auth: authReducer,
});

//export const useSelector = createSelectorHook<YourRootState>()

export default rootReducer;
//export type RootState = ReturnType<typeof rootReducer>;
