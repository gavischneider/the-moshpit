import React, { useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";
import { feeds } from "../constants/feeds";

export const Home = () => {
  useEffect(() => {
    axios({
      method: "GET",
      url: "auth/login/success",
    }).then((res: any) => {
      if (res.success) {
        return (
          <div className="App bg-black">
            <Navbar />
            <Sidebar />
            <Newsfeed user={res.user} />
          </div>
        );
      }
    });
  });
  // If there's no user signed in, we'll send all the deafault feeds
  const user = {
    sources: feeds,
  };

  return (
    <div className="App bg-black">
      <Navbar />
      <Sidebar />
      <Newsfeed user={user} />
    </div>
  );
};
