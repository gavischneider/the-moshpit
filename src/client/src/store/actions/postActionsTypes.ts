import { Post } from "../../../../shared/Post";

export const UPVOTE_SUCCESS = "UPVOTE_SUCCESS";
export const UPVOTE_FAILURE = "UPVOTE_FAILURE";

interface UpvoteSuccess {
  type: typeof UPVOTE_SUCCESS;
}

interface UpvoteFailure {
  type: typeof UPVOTE_FAILURE;
}

export type PostDispatchTypes = UpvoteSuccess | UpvoteFailure;
