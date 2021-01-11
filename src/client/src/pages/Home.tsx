import React, { useEffect, useState } from "react";
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
import { Publisher } from "../../../shared/Publisher";
//import { InitialState } from "../store/reducers/rootReducer";

export const PublisherContext = React.createContext(Array<Publisher>());

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const { user, authenticated } = userState;

  const publisherState = useSelector((state: InitialState) => {
    return state.publishers;
  });

  const { publishers, loadedUsersFeeds } = publisherState;

  //const [pubs, setPubs] = useState(publishers);

  useEffect(() => {
    // Check if there's a user but we dont yet have it
    if (userState && user === undefined) {
      //&& userState.authenticated
      dispatch(setUser());
    }
    //if (publishers === undefined && user === undefined && !loadedUsersFeeds) {
    // Load all default publishers into state
    //dispatch(getAllPublishers());
    //} else
    if (authenticated && !loadedUsersFeeds) {
      // User logged in, load their feeds
      dispatch(getUsersPublishers(user?.user.sources));
      console.log("IN THE DISPATCH GET USERS PUBLISHERS");
      console.log(user?.user.sources);
    }
  }, [loadedUsersFeeds, publishers, user]);

  return (
    <div className="App bg-gray-900 min-h-screen">
      <PublisherContext.Provider
        value={publishers ? publishers : Array<Publisher>()}
      >
        <Navbar user={authenticated} />
        <Sidebar user={user} />
        <Newsfeed user={user} />
      </PublisherContext.Provider>
    </div>
  );
};
