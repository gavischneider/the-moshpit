import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Publisher } from "../../../shared/Publisher";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { UpvotedNewsfeed } from "../components/UpvotedNewsfeed";
import { setUser } from "../store/actions/authActions";
import { getUsersPublishers } from "../store/actions/publisherActions";
import { InitialState } from "../store/reducers/rootReducer";

export const Upvoted = () => {
  const dispatch = useDispatch();

  const [allFeeds, setAllFeeds] = useState(Array<Publisher>());

  // This will retrieve ALL the feeds (not the users) and store them
  useEffect(() => {
    axios({
      method: "GET",
      url: "publisher/getpublishers",
    })
      .then((feeds: any) => {
        console.log("FEEDS - APP JUST LOADED");
        console.log(feeds);
        setAllFeeds(feeds.data);
      })
      .catch((err) => console.log(`Error getting all feeds, ${err}`));
  }, []);

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
      <UpvotedNewsfeed user={user} allFeeds={allFeeds}  />
    </div>
  );
};
