import { Publisher } from "../../../../shared/Publisher";

export const GET_PUBLISHERS_SUCCESS = "GET_PUBLISHERS_SUCCESS";
export const GET_PUBLISHERS_FAILURE = "GET_PUBLISHERS_FAILURE";
export const GET_USERS_PUBLISHERS_SUCCESS = "GET_USERS_PUBLISHERS_SUCCESS";
export const GET_USERS_PUBLISHERS_FAILURE = "GET_USERS_PUBLISHERS_FAILURE";
export const REMOVE_FEED_SUCCESS = "REMOVE_FEED_SUCCESS";
export const REMOVE_FEED_FAILURE = "REMOVE_FEED_FAILURE";
export const ADD_FEED_SUCCESS = "ADD_FEED_SUCCESS";
export const ADD_FEED_FAILURE = "ADD_FEED_FAILURE";

interface GetPublishersSuccess {
  type: typeof GET_PUBLISHERS_SUCCESS;
  payload: {
    publishers: Publisher[];
  };
}

interface GetPublishersFailure {
  type: typeof GET_PUBLISHERS_FAILURE;
}

interface getUsersPublishersSuccess {
  type: typeof GET_USERS_PUBLISHERS_SUCCESS;
  payload: {
    publishers: Publisher[];
  };
}

interface getUsersPublishersFailure {
  type: typeof GET_USERS_PUBLISHERS_FAILURE;
}

interface removeFeedSuccess {
  type: typeof REMOVE_FEED_SUCCESS;
  payload: {
    publishers: Publisher[];
  };
}

interface removeFeedFailure {
  type: typeof REMOVE_FEED_FAILURE;
}

interface addFeedSuccess {
  type: typeof ADD_FEED_SUCCESS;
  payload: Publisher;
}

interface addFeedFailure {
  type: typeof ADD_FEED_FAILURE;
}

export type PublisherDispatchTypes =
  | GetPublishersSuccess
  | GetPublishersFailure
  | getUsersPublishersSuccess
  | getUsersPublishersFailure
  | removeFeedSuccess
  | removeFeedFailure
  | addFeedSuccess
  | addFeedFailure;
