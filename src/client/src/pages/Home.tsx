import React, { useEffect } from "react";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/actions/authActions";
import { InitialState } from "../store/reducers/rootReducer";
import {
  getAllPublishers,
  getUsersPublishers,
} from "../store/actions/publisherActions";
//import { InitialState } from "../store/reducers/rootReducer";

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers, loadedUsersFeeds } = publisherState;

  useEffect(() => {
    // Check if there's a user but we dont yet have it
    if (userState && user === undefined) {
      //&& userState.authenticated
      dispatch(setUser());
    }
    if (publishers === undefined) {
      // Load publishers into state
      dispatch(getAllPublishers());
    }
    if (authenticated && !loadedUsersFeeds) {
      // User logged in, load their feeds
      dispatch(getUsersPublishers(user?.user.sources));
      console.log("IN THE DISPATCH GET USERS PUBLISHERS");
      console.log(user?.user.sources);
    }
  }, [loadedUsersFeeds, publishers]);

  return (
    <div className="App bg-gray-900 min-h-screen">
      <Navbar />
      <Sidebar user={user} />
      <Newsfeed user={user} />
    </div>
  );
};
