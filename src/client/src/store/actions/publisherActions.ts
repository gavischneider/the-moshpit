import axios from "axios";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Publisher } from "../../../../shared/Publisher";
import { InitialState } from "../reducers/rootReducer";
import {
  GET_PUBLISHERS_SUCCESS,
  GET_PUBLISHERS_FAILURE,
  PublisherDispatchTypes,
  GET_USERS_PUBLISHERS_SUCCESS,
  GET_USERS_PUBLISHERS_FAILURE,
  REMOVE_FEED_SUCCESS,
  REMOVE_FEED_FAILURE,
} from "./publisherActionsTypes";

export const getAllPublishers = () => async (
  dispatch: Dispatch<PublisherDispatchTypes>
) => {
  console.log("IN THE GET_ALL_PUBLISHERS FUNCTION");
  try {
    axios({
      method: "GET",
      url: "publisher/getpublishers",
    })
      .then((res) => {
        dispatch({
          type: GET_PUBLISHERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_PUBLISHERS_FAILURE,
        });
      });
  } catch (error) {
    dispatch({
      type: GET_PUBLISHERS_FAILURE,
    });
  }
};

export const getUsersPublishers = (usersFeeds: any) => async (
  dispatch: Dispatch<PublisherDispatchTypes>
) => {
  console.log("IN THE GET_USERS_PUBLISHERS FUNCTION");
  try {
    dispatch({
      type: GET_USERS_PUBLISHERS_SUCCESS,
      payload: usersFeeds,
    });
  } catch {
    dispatch({
      type: GET_USERS_PUBLISHERS_FAILURE,
    });
  }
};

export const removeFeed = (allFeeds: any, feed: any, userId: any) => async (
  dispatch: Dispatch<PublisherDispatchTypes>
) => {
  console.log("IN THE REMOVE_FEED FUNCTION");
  try {
    axios({
      method: "PUT",
      url: "publisher/removepublisher",
      params: { publisher: feed, userId },
    })
      .then((res) => {
        allFeeds.filter((feed: any) => {
          feed.name !== feed;
        });

        console.log(`Feed was removed, ${res}`);
        dispatch({
          type: REMOVE_FEED_SUCCESS,
          payload: allFeeds,
        });
      })
      .catch((err) => {
        console.log(`Error removing feed, ${err}`);
        dispatch({
          type: REMOVE_FEED_FAILURE,
        });
      });
  } catch {
    dispatch({ type: REMOVE_FEED_FAILURE });
    console.log("Caught error while removing feed");
  }
};
