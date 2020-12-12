import React from "react";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";

export const Home = () => {
  return (
    <div className="App bg-black">
      <Navbar />
      <Sidebar />
      <Newsfeed />
    </div>
  );
};
