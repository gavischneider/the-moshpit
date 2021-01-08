import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { UpvotedNewsfeed } from "../components/UpvotedNewsfeed";
import { InitialState } from "../store/reducers/rootReducer";

export const Upvoted = () => {
  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const { user, authenticated } = userState;

  return (
    <div className="App bg-gray-900 min-h-screen">
      <Navbar />
      <Sidebar user={user} />
      <UpvotedNewsfeed />
    </div>
  );
};
