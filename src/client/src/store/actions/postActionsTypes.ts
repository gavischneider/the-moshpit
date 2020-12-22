import { Post } from "../../../../shared/Post";

export const UPVOTE_SUCCESS = "UPVOTE_SUCCESS";
export const UPVOTE_FAILURE = "UPVOTE_FAILURE";
export const DOWNVOTE_SUCCESS = "DOWNVOTE_SUCCESS";
export const DOWNVOTE_FAILURE = "DOWNVOTE_FAILURE";

interface UpvoteSuccess {
  type: typeof UPVOTE_SUCCESS;
}

interface UpvoteFailure {
  type: typeof UPVOTE_FAILURE;
}

interface DownvoteSuccess {
  type: typeof DOWNVOTE_SUCCESS;
}

interface DownvoteFailure {
  type: typeof DOWNVOTE_FAILURE;
}

export type PostDispatchTypes =
  | UpvoteSuccess
  | UpvoteFailure
  | DownvoteSuccess
  | DownvoteFailure;
