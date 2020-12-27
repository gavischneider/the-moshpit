import { Reducer } from "react";
import {
  GET_PUBLISHERS_SUCCESS,
  GET_PUBLISHERS_FAILURE,
  PublisherDispatchTypes,
} from "../actions/publisherActionsTypes";
import { Publisher } from "../../../../shared/Publisher";

interface PublisherResponse {
  publishers: Publisher[];
}

export interface PublisherState {
  publishers: Publisher[] | undefined;
}

const defaultState: PublisherState = {
  publishers: undefined,
};

const publisherReducer = (
  state: PublisherState = defaultState,
  action: PublisherDispatchTypes
) => {
  switch (action.type) {
    case GET_PUBLISHERS_SUCCESS:
      return {
        ...state,
        publishers: action.payload,
      };
    case GET_PUBLISHERS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default publisherReducer;

// Reducer<PublisherState, PublisherDispatchTypes>
