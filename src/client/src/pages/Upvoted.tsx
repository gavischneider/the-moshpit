import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { UpvotedNewsfeed } from "../components/UpvotedNewsfeed";
import { setUser } from "../store/actions/authActions";
import { InitialState } from "../store/reducers/rootReducer";

export const Upvoted = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if there's a user but we dont yet have it
    if (userState && user === undefined) {
      //&& userState.authenticated
      dispatch(setUser());
    }
  }, []);

  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const { user, authenticated } = userState;

  return (
    <div className="App bg-gray-900 min-h-screen">
      <Navbar user={authenticated} />
      <Sidebar user={user} />
      <UpvotedNewsfeed user={user} />
    </div>
  );
};
