import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { User } from "../../../shared/User";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setUser } from "../store/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { AuthState } from "../store/reducers/authReducer";

export const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector<AuthState, AuthState["user"]>((state) => {
    console.log(`STATE: `);
    console.log(state.user);
    return state.user;
  });

  //const { userState} = useSelector(state => state.user);

  console.log("USER: ");
  console.log(userState);
  const authenticated = useSelector<AuthState, AuthState["authenticated"]>(
    (state) => state.authenticated
  );

  useEffect(() => {
    // Check if there's a user authenticated but we dont yet have it
    if (userState === undefined) {
      //&& authenticated
      dispatch(setUser());
    }
  });

  //useEffect(() => {});
  //const { user, status, getUser } = props;
  //const u = getUser({});

  // const [profile, setProfile] = useState(Array<User>());
  // const [authenticated, setAuthenticated] = useState(false);
  // const [error, setError] = useState<String | null>(null);

  //if (!user.username) return <Redirect to="/login" />;

  //const proxyUrl = "http://localhost:5000";

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "auth/login/success",
  //   })
  //     .then((res: any) => {
  //       if (res.status === 200) return res;
  //       throw new Error("Failed to authenticate user");
  //     })
  //     .then((res: any) => {
  //       console.log(res.data);
  //       setProfile([res.data.user]);
  //       setAuthenticated(true);
  //     })
  //     .catch((error) => {
  //       setAuthenticated(false);
  //       setError("Failed to authenticate user");
  //     });
  // }, []);

  // console.log(`PROFILE: ${profile}`);
  // if (!profile[0]) return <span>loading...</span>;

  // const handleNotAuthenticated = () => {
  //   setAuthenticated(false);
  // };

  return (
    <div>
      <Navbar
      //authenticated={authenticated}
      //handleNotAuthenticated={handleNotAuthenticated}
      />
      <h1>Profile!!!</h1>
      <h2>{userState && userState.user.username}</h2>
      <h2>{userState && userState.user.email}</h2>
      <img src={userState && userState.user.photo} alt={"profile"} />
      <h2>Your News Sources</h2>
      {/* <ul>
        {userState &&
          userState.user.sources.map((source: any) => {
            return <li key={source.url}>{source.name}</li>;
          })}
      </ul> */}
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   return {
//     user: state.auth.user,
//     status: state.auth.status,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     getUser: (user: any) => dispatch(getUser(user)),
//   };
// };
