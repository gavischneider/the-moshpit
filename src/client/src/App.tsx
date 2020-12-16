import React from "react";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Profile from "./pages/Profile";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/reducers/rootReducer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
