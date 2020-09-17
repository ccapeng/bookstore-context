import React, { createContext, useReducer } from 'react';
import { TabReducer } from './TabReducer';
import { ACTIONS } from './types';

// Initial state
const initialState = {
  tab: ""
}

// Create context
export const TabContext = createContext(initialState);

// Provider component
export const TabProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TabReducer, initialState);

  const creator = {
    setTab: (data) => {
      return {
        type: ACTIONS.SET_TAB,
        payload: data
      }
    }
  }

  const setTab = async (tab) => {
    dispatch(creator.setTab(tab));
  }
  return (<TabContext.Provider value={{
    tab: state.tab,
    setTab
  }}>
    {children}
  </TabContext.Provider>);
}