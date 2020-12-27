import { Publisher } from "../../../../shared/Publisher";

export const GET_PUBLISHERS_SUCCESS = "GET_PUBLISHERS_SUCCESS";
export const GET_PUBLISHERS_FAILURE = "GET_PUBLISHERS_FAILURE";

interface GetPublishersSuccess {
  type: typeof GET_PUBLISHERS_SUCCESS;
  payload: {
    publishers: Publisher[];
  };
}

interface GetPublishersFailure {
  type: typeof GET_PUBLISHERS_FAILURE;
}

export type PublisherDispatchTypes =
  | GetPublishersSuccess
  | GetPublishersFailure;
