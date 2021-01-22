import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RootState from "./store/reducers/rootReducer";
import { Upvoted } from "./pages/Upvoted";
import "./App.css";
import axios from "axios";
import { Publisher } from "../../shared/Publisher";

function App() {
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

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/upvoted" component={Upvoted} />
      </Switch>
    </Router>
  );
}

export default App;
