import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";
import { feeds } from "../constants/feeds";
import { User } from "../../../shared/User";
import { connect } from "react-redux";
import { getUser } from "../store/actions/authActions";

const Home = (props: any) => {
  const [profile, setProfile] = useState(Array<User>());
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { user, getUser, status } = props;
    const u = getUser(profile);

    if (u && status === 200) {
      setProfile([user]);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    // axios({
    //   method: "GET",
    //   url: "auth/login/success",
    // })
    //   .then((res: any) => {
    //     if (res.status === 200) {
    //       setProfile([res.data.user]);
    //       setAuthenticated(true);
    //     }
    //   })
    //   .catch((error) => {
    //     setAuthenticated(false);
    //   });
  }, []);

  const handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

  console.log("=-=-=-=-=-=-=PROFILE-=-=-=-=-=-=-=");
  console.log(profile);
  //if (!profile[0]) return <span>loading...</span>;

  console.log("############ WE FOUND USER ###############");
  return (
    <div className="App bg-black">
      <Navbar
        authenticated={authenticated}
        handleNotAuthenticated={handleNotAuthenticated}
      />
      <Sidebar />
      <Newsfeed user={profile[0]} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUser: (user: any) => dispatch(getUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
