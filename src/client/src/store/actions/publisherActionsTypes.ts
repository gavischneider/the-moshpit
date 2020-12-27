export const GET_PUBLISHERS_SUCCESS = "GET_PUBLISHERS_SUCCESS";
export const GET_PUBLISHERS_FAILURE = "GET_PUBLISHERS_FAILURE";

interface GetPublishersSuccess {
  type: typeof GET_PUBLISHERS_SUCCESS;
}

interface GetPublishersFailure {
  type: typeof GET_PUBLISHERS_FAILURE;
}

export type PublisherDispatchTypes =
  | GetPublishersSuccess
  | GetPublishersFailure;
