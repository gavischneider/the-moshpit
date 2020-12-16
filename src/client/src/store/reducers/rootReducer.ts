import authReducer from "./authReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
//export type RootState = ReturnType<typeof rootReducer>;
