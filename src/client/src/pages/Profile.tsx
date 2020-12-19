import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { User } from "../../../shared/User";
import { Redirect } from "react-router-dom";
import { setUser } from "../store/actions/authActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { AuthState } from "../store/reducers/authReducer";
import { InitialState } from "../store/reducers/rootReducer";
import store from "../index";

export const Profile = () => {
  const dispatch = useDispatch();

  const userState = useSelector((state: InitialState) => {
    console.log("STATEEEEEE");
    console.log(state.auth);
    return state.auth;
  });

  const { user, authenticated } = userState;

  // useEffect(() => {
  //   // Check if there's a user authenticated but we dont yet have it
  //   if (typeof userState.user === "undefined") {
  //     // && userState.authenticated
  //     console.log("IM IN THE IF");
  //     dispatch(setUser());
  //   }
  // });

  //if (!userState.authenticated) return <Redirect to="/login" />;

  return (
    <div>
      <Navbar user={userState} />
      <h1>Profile!!!</h1>
      {userState.user && (
        <div>
          <h2>{userState.user.user.username}</h2>
          <h2>{userState.user.user.email}</h2>
          <img src={userState.user.user.photo} alt={"profile"} />
          <h2>Your News Sources</h2>
          <ul>
            {userState.user.user.sources.map((source: any) => {
              return <li key={source.url}>{source.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
