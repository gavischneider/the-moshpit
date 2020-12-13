import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

export const Profile = () => {
  useEffect(() => {
    axios({
      method: "GET",
      url: "auth/user",
    }).then((res: any) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Profile!!!</h1>
    </div>
  );
};
