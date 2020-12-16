import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { User } from "../../../shared/User";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { getUser } from "../store/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";
import RootState from "../store/reducers/rootReducer";

const Profile = (props: any) => {
  const user: any = useSelector((state: typeof RootState) => state.auth.user);
  const dispatch = useDispatch();

  //useEffect(() => {});
  //const { user, status, getUser } = props;
  //const u = getUser({});

  // const [profile, setProfile] = useState(Array<User>());
  // const [authenticated, setAuthenticated] = useState(false);
  // const [error, setError] = useState<String | null>(null);

  console.log("USER: ");
  console.log(user);
  if (!user.username) return <Redirect to="/login" />;

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
      <h2>{user && user.username}</h2>
      <h2>{user && user.email}</h2>
      <img src={user && user.photo} alt={"profile"} />
      <h2>Your News Sources</h2>
      {/* <ul>
        {user &&
          user.sources.map((source: any) => {
            return <li key={source.url}>{source.name}</li>;
          })}
      </ul> */}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    status: state.auth.status,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUser: (user: any) => dispatch(getUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
