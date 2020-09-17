import { ACTIONS } from "./types";

export const AuthorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_AUTHORS:
      return {
        ...state,
        authors: action.payload.sort(
          function (a, b) { return a.lastName.toLowerCase() > b.lastName.toLowerCase() }
        )
      }
    case ACTIONS.SET_AUTHOR_DELETED:
      return {
        ...state,
        authors: state.authors.filter(author => author.id !== action.payload)
      }

    case ACTIONS.SET_AUTHOR:
      return {
        ...state,
        author: action.payload
      };

    case ACTIONS.SET_AUTHOR_VALUE:
      return {
        ...state,
        author: {
          ...state.author,
          ...action.payload
        }
      };

    case ACTIONS.INIT_AUTHOR:
      return {
        ...state,
        author: action.payload
      };
    case ACTIONS.SET_AUTHOR_STATUS:
      console.log("reducer status", action.payload);
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}