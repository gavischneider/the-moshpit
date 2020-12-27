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
