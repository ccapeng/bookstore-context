import { ACTIONS } from "./types";

export const PublisherReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PUBLISHERS:
      return {
        ...state,
        publishers: action.payload.sort(
          function (a, b) { return a.name.toLowerCase() > b.name.toLowerCase() }
        )
      }
    case ACTIONS.SET_PUBLISHER_DELETED:
      return {
        ...state,
        publishers: state.publishers.filter(publisher => publisher.id !== action.payload)
      }

    case ACTIONS.SET_PUBLISHER:
      return {
        ...state,
        publisher: action.payload
      };
    case ACTIONS.SET_PUBLISHER_NAME:
      return {
        ...state,
        publisher: {
          ...state.publisher,
          name: action.payload
        }
      };
    case ACTIONS.INIT_PUBLISHER:
      return {
        ...state,
        publisher: action.payload
      };
    case ACTIONS.SET_PUBLISHER_STATUS:
      console.log("reducer status", action.payload);
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}