import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { User } from "../../../shared/User";
import axios from "axios";

export const Profile = () => {
  const [profile, setProfile] = useState(Array<User>());
  const proxyUrl = "http://localhost:5000";

  useEffect(() => {
    axios({
      method: "GET",
      url: "auth/user",
    }).then((res: any) => {
      console.log(res.data);
      setProfile([res.data]);
    });
  }, []);

  console.log(`PROFILE: ${profile}`);
  if (!profile[0]) return <span>loading...</span>;

  return (
    <div>
      <Navbar />
      <h1>Profile!!!</h1>
      <h2>{profile[0].username}</h2>
      <h2>{profile[0].email}</h2>
      <img src={profile[0].photo} alt={"profile"} />
    </div>
  );
};
