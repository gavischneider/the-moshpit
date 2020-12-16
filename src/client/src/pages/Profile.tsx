import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { User } from "../../../shared/User";
import axios from "axios";

export const Profile = () => {
  const [profile, setProfile] = useState(Array<User>());
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const proxyUrl = "http://localhost:5000";

  useEffect(() => {
    axios({
      method: "GET",
      url: "auth/login/success",
    })
      .then((res: any) => {
        if (res.status === 200) return res;
        throw new Error("Failed to authenticate user");
      })
      .then((res: any) => {
        console.log(res.data);
        setProfile([res.data.user]);
        setAuthenticated(true);
      })
      .catch((error) => {
        setAuthenticated(false);
        setError("Failed to authenticate user");
      });
  }, []);

  console.log(`PROFILE: ${profile}`);
  if (!profile[0]) return <span>loading...</span>;

  const handleNotAuthenticated = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      <Navbar
        authenticated={authenticated}
        handleNotAuthenticated={handleNotAuthenticated}
      />
      <h1>Profile!!!</h1>
      <h2>{profile[0].username}</h2>
      <h2>{profile[0].email}</h2>
      <img src={profile[0].photo} alt={"profile"} />
      <h2>Your News Sources</h2>
      <ul>
        {profile[0].sources.map((source: any) => {
          return <li key={source.url}>{source.name}</li>;
        })}
      </ul>
    </div>
  );
};
