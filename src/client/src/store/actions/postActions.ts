import axios from "axios";
import { Dispatch } from "redux";
import {
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  PostDispatchTypes,
} from "./postActionsTypes";
import { Post } from "../../../../shared/Post";

export const upvotePost = (postId: string, userId: string) => async (
  dispatch: Dispatch<PostDispatchTypes>
) => {
  console.log("IN THE UPVOTE_POST FUNCTION");
  try {
    axios({
      method: "POST",
      url: "post/upvotepost",
      params: { postId, userId },
    })
      .then((res) => {
        dispatch({
          type: UPVOTE_SUCCESS,
        });
      })
      .catch((err) =>
        console.log(`Error sending axios reguest (upvoting post): ${err}`)
      );
  } catch (error) {
    dispatch({
      type: UPVOTE_FAILURE,
    });
  }
};

export const downvotePost = (postId: string, userId: string) => async (
  dispatch: Dispatch<PostDispatchTypes>
) => {
  console.log("IN THE DOWNVOTE_POST FUNCTION");
  try {
    axios({
      method: "POST",
      url: "post/downvotepost",
      params: { postId, userId },
    })
      .then((res) => {
        dispatch({
          type: DOWNVOTE_SUCCESS,
        });
      })
      .catch((err) =>
        console.log(`Error sending axios reguest (downvoting post): ${err}`)
      );
  } catch (error) {
    dispatch({
      type: DOWNVOTE_FAILURE,
    });
  }
};
