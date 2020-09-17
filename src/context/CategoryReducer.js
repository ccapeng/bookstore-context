import { ACTIONS } from "./types";

export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.sort(
          function (a, b) { return a.name.toLowerCase() > b.name.toLowerCase() }
        )
      }
    case ACTIONS.SET_CATEGORY_DELETED:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }

    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ACTIONS.SET_CATEGORY_NAME:
      return {
        ...state,
        category: {
          ...state.category,
          name: action.payload
        }
      };
    case ACTIONS.INIT_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ACTIONS.SET_CATEGORY_STATUS:
      console.log("reducer status", action.payload);
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
}