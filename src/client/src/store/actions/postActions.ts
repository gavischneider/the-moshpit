import axios from "axios";
import { Dispatch } from "redux";
import {
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  PostDispatchTypes,
} from "./postActionsTypes";
import { Post } from "../../../../shared/Post";

export const upvotePost = (postId: string, userId: string) => async (
  dispatch: Dispatch<PostDispatchTypes>
) => {
  console.log("IN THE UPVOTE_POST FUNCTION");
  try {
    // Add users id to upvotes array

    // Send new post to backend to save in db

    // axios code ....

    dispatch({
      type: UPVOTE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPVOTE_FAILURE,
    });
  }
};
