import axios from "axios";
import { Dispatch } from "redux";
import { Publisher } from "../../../../shared/Publisher";
import { User } from "../../../../shared/User";
import {
  AuthDispatchTypes,
  USER_LOADING,
  USER_FAIL,
  USER_SUCCESS,
  REMOVE_FEED_FROM_USER_STATE,
  ADD_FEED_TO_USER_STATE,
} from "./authActionsTypes";

export const setUser = () => async (dispatch: Dispatch<AuthDispatchTypes>) => {
  console.log("IN THE SETUSER FUNCTION");
  try {
    dispatch({
      type: USER_LOADING,
    });

    //http://localhost:5000/
    const res = await axios.get("auth/login/success");

    dispatch({
      type: USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAIL,
    });
  }
};

// export const addFeedToUser = (
//   user: User,
//   feeds: Publisher[],
//   newFeed: Publisher
// ) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
//   try {
//     let newFeeds: Publisher[] = feeds;
//     newFeeds.push(newFeed);

//     let newUser: User = {
//       ...user,
//       sources: newFeeds,
//     };
//     dispatch({
//       type: ADD_FEED_TO_USER_STATE,
//       payload: newUser,
//     });
//   } catch {
//     console.log("Error adding feed to user state");
//   }
// };

// export const removeFeedFromUser = (
//   user: User,
//   feeds: any,
//   newFeed: any
// ) => async (dispatch: Dispatch<AuthDispatchTypes>) => {
//   try {
//     let newFeeds = feeds.filter((feed: any) => {
//       return feed.name.localeCompare(newFeed) !== 0;
//     });
//     let newUser = {
//       ...user,
//       sources: newFeeds,
//     };
//     dispatch({
//       type: REMOVE_FEED_FROM_USER_STATE,
//       payload: newUser,
//     });
//   } catch {
//     console.log("Error removing feed from user state");
//   }
// };
