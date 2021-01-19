import { Reducer } from "react";
import { Post } from "../../../../shared/Post";
import {
  DOWNVOTE_FAILURE,
  DOWNVOTE_SUCCESS,
  PostDispatchTypes,
  UPVOTE_FAILURE,
  UPVOTE_SUCCESS,
} from "../actions/postActionsTypes";

export interface PostState {
  postId: string | undefined;
}

const defaultState: PostState = {
  postId: undefined,
};

const postReducer: Reducer<PostState, PostDispatchTypes> = (
  state: PostState = defaultState,
  action: PostDispatchTypes
) => {
  switch (action.type) {
    case UPVOTE_SUCCESS:
    case UPVOTE_FAILURE:
    case DOWNVOTE_SUCCESS:
    case DOWNVOTE_FAILURE:
    default:
      return state;
  }
};

export default postReducer;
