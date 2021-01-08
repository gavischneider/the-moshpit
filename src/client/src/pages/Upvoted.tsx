import React from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../store/reducers/rootReducer";

export const Upvoted = () => {
  const userState = useSelector((state: InitialState) => {
    return state.auth;
  });

  const { user, authenticated } = userState;

  return <div></div>;
};
