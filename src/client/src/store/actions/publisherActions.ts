import axios from "axios";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { InitialState } from "../reducers/rootReducer";
import {
  GET_PUBLISHERS_SUCCESS,
  GET_PUBLISHERS_FAILURE,
  PublisherDispatchTypes,
} from "./publisherActionsTypes";

const userState = useSelector((state: InitialState) => {
  console.log("STATEEEEEE");
  console.log(state.auth);
  return state.auth;
});

const { user, authenticated } = userState;

export const getAllPublishers = () => async (
  dispatch: Dispatch<PublisherDispatchTypes>
) => {
  console.log("IN THE GET_ALL_PUBLISHERS FUNCTION");
  // If there's a user, get their feeds, otherwise, get all feeds
  if (user && authenticated) {
    // Get users feeds
  } else {
    // get all feeds
  }
};
