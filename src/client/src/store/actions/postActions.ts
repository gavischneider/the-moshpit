import axios from "axios";
import { Dispatch } from "redux";
import { PostDispatchTypes } from "./postActionsTypes";
import { Post } from "../../../../shared/Post";

export const upvotePost = (post: Post, userId: string) => async (
  dispatch: Dispatch<PostDispatchTypes>
) => {
  console.log("IN THE UPVOTE_POST FUNCTION");
  try {
    // Add users id to upvotes array
    const newPost = {
      ...post,
      upvotes: [...post.upvotes, userId],
    };
    // Send new post to backend to save in db

    // axios code ....

    // dispatch({
    //   type: UPVOTE_SUCCESS,
    // });
  } catch (error) {
    // dispatch({
    //   type: UPVOTE_FAIL,
    // });
  }
};
