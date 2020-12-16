import axios from "axios";

export const getUser = (user: any) => {
  return (dispatch: any, getState: any) => {
    // Make async call to backend
    axios({
      method: "GET",
      url: "auth/login/success",
    })
      .then((res: any) => {
        console.log("I JUST DISPATCHED THIS USER: ");
        console.log(res.data.user);
        dispatch({
          type: "GET_USER",
          user: res.data.user,
          status: res.status,
        });

        //dispatch({ type: "GET_USER", user: {}, status: res.status });
      })
      .catch((error) => {
        //   setAuthenticated(false);
        dispatch({ type: "GET_USER_ERROR", error });
      });
  };
};
