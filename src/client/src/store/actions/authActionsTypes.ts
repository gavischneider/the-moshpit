import { User } from "../../../../shared/User";

export const USER_LOADING = "USER_LOADING";
export const USER_FAIL = "USER_FAIL";
export const USER_SUCCESS = "USER_SUCCESS";

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

export type AuthDispatchTypes = UserLoading | UserFail | UserSuccess;
