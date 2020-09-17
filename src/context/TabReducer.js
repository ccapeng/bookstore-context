import { ACTIONS } from "./types";

export const TabReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TAB:
      return {
        tab: action.payload
      };

    default:
      return state;
  }
}