import axios from "axios";

export const getUser = (user: any) => {
  return (dispatch: any, getState: any) => {
    // Make async call to backend
    axios({
      method: "GET",
      url: "auth/login/success",
    })
      .then((res: any) => {
        if (res.status === 200) {
          // setProfile([res.data.user]);
          // setAuthenticated(true);
          dispatch({
            type: "GET_USER",
            user: res.data.user,
            status: res.status,
          });
        } else {
          dispatch({ type: "GET_USER", user: {}, status: res.status });
        }
      })
      .catch((error) => {
        //   setAuthenticated(false);
        dispatch({ type: "GET_USER_ERROR", error });
      });
  };
};
