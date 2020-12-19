import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Newsfeed } from "../components/Newsfeed";
import { feeds } from "../constants/feeds";
import { User } from "../../../shared/User";
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import { setUser } from "../store/actions/authActions";
import { AuthState } from "../store/reducers/authReducer";
import { RootStore } from "../index";
import { InitialState } from "../store/reducers/rootReducer";
//import { InitialState } from "../store/reducers/rootReducer";

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;

  useEffect(() => {
    // Check if there's a user authenticated but we dont yet have it
    if (userState && userState.user === undefined) {
      //&& userState.authenticated
      dispatch(setUser());
    }
  }, []);

  return (
    <div className="App bg-black">
      <Navbar />
      <Sidebar />
      <Newsfeed user={user} />
    </div>
  );
};
