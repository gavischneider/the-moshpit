import { Publisher } from "../../../../shared/Publisher";
import { User } from "../../../../shared/User";

export const USER_LOADING = "USER_LOADING";
export const USER_FAIL = "USER_FAIL";
export const USER_SUCCESS = "USER_SUCCESS";
export const REMOVE_FEED_FROM_USER_STATE = "REMOVE_FEED_FROM_USER_STATE";
export const ADD_FEED_TO_USER_STATE = "ADD_FEED_TO_USER_STATE";

interface UserLoading {
  type: typeof USER_LOADING;
}

interface UserFail {
  type: typeof USER_FAIL;
}

interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: {
    user: User;
    status: number;
    authenticated: boolean;
  };
}

// interface removeFeedFromUserState {
//   type: typeof REMOVE_FEED_FROM_USER_STATE;
//   payload: {
//     user: User;
//     status: number;
//     authenticated: boolean;
//   };
// }

// interface addFeedToUserState {
//   type: typeof ADD_FEED_TO_USER_STATE;
//   payload: {
//     user: User;
//   };
// }

export type AuthDispatchTypes = UserLoading | UserFail | UserSuccess;

//   | removeFeedFromUserState
//   | addFeedToUserState;
