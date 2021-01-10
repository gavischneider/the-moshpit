import { Reducer } from "react";
import {
  GET_PUBLISHERS_SUCCESS,
  GET_PUBLISHERS_FAILURE,
  PublisherDispatchTypes,
  GET_USERS_PUBLISHERS_FAILURE,
  GET_USERS_PUBLISHERS_SUCCESS,
  REMOVE_FEED_SUCCESS,
  REMOVE_FEED_FAILURE,
  ADD_FEED_SUCCESS,
  ADD_FEED_FAILURE,
} from "../actions/publisherActionsTypes";
import { Publisher } from "../../../../shared/Publisher";

interface PublisherResponse {
  publishers: Publisher[];
}

export interface PublisherState {
  publishers: Publisher[] | undefined;
  loadedUsersFeeds: boolean;
  feedCount: number;
}

const defaultState: PublisherState = {
  publishers: undefined,
  loadedUsersFeeds: false,
  feedCount: 0,
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
    case GET_USERS_PUBLISHERS_SUCCESS:
      let fc = state.publishers ? state.publishers.length : 0;
      return {
        ...state,
        publishers: action.payload,
        loadedUsersFeeds: true,
      };
    case GET_USERS_PUBLISHERS_FAILURE:
      return state;
    case REMOVE_FEED_SUCCESS:
      return {
        ...state,
        publishers: action.payload,
      };
    case REMOVE_FEED_FAILURE:
      return state;
    case ADD_FEED_SUCCESS:
      let pubs = state.publishers || [];
      return {
        ...state,
        publishers: [...pubs, action.payload],
      };
    case ADD_FEED_FAILURE:
      return state;
    default:
      return state;
  }
};

export default publisherReducer;

// Reducer<PublisherState, PublisherDispatchTypes>
