import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";
import { feeds } from "../constants/feeds";
import { User } from "../../../shared/User";
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import { setUser } from "../store/actions/authActions";
import { AuthState } from "../store/reducers/authReducer";
import { RootStore } from "../index";

export const Home: React.FC = (/*{user, authenticated, getUser}*/) => {
  // const [profile, setProfile] = useState(Array<User>());
  // const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch();
  //const user = useSelector((state: RootStore) => state.user)

  const userState = useSelector<AuthState, AuthState["user"]>(
    (state) => state.user
  );
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

  console.log("USER: ");
  console.log(userState);

  // useEffect(() => {
  //   const { user, getUser, status } = props;
  //   const u = getUser(profile);

  //   if (u && status === 200) {
  //     setProfile([user]);
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }

  //   // axios({
  //   //   method: "GET",
  //   //   url: "auth/login/success",
  //   // })
  //   //   .then((res: any) => {
  //   //     if (res.status === 200) {
  //   //       setProfile([res.data.user]);
  //   //       setAuthenticated(true);
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     setAuthenticated(false);
  //   //   });
  // }, []);

  // const handleNotAuthenticated = () => {
  //   setAuthenticated(false);
  // };

  //console.log("=-=-=-=-=-=-=PROFILE-=-=-=-=-=-=-=");
  //console.log(profile);
  //if (!profile[0]) return <span>loading...</span>;

  //console.log("############ WE FOUND USER ###############");
  return (
    <div className="App bg-black">
      <Navbar
      // authenticated={authenticated}
      // handleNotAuthenticated={handleNotAuthenticated}
      />
      <Sidebar />
      <Newsfeed user={userState && userState.user} />
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
