const initState = {
  user: {},
};

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "GET_USER":
      console.log("authReducer, action: GET_USER");
      return {
        ...state,
        user: action.user,
      };
    case "GET_USER_ERROR":
      console.log("GET_USER_ERROR: " + action.error);
      return state;
    default:
      console.log("Default");
      return state;
  }
};

export default authReducer;
