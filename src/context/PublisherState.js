import React, { createContext, useEffect, useReducer } from 'react';
import { PublisherReducer } from './PublisherReducer';
import { ACTIONS } from './types';
import PublisherService from "../services/publisher.js";

// Initial state
const initialState = {
  publishers: [],
  publisher: {
    id: 0,
    name: ""
  },
  status: ""
}

// Create context
export const PublisherContext = createContext(initialState);

// Provider component
export const PublisherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PublisherReducer, initialState);

  const creator = {
    setPublishersState: (data) => {
      return {
        type: ACTIONS.SET_PUBLISHERS,
        payload: data
      }
    },
    setPublisherDeletedState: (id) => {
      return {
        type: ACTIONS.SET_PUBLISHER_DELETED,
        payload: id
      }
    },
    setPublisher: (data) => {
      return {
        type: ACTIONS.SET_PUBLISHER,
        payload: data
      }
    },
    initPublisher: () => {
      return {
        type: ACTIONS.INIT_PUBLISHER,
        payload: initialState.publisher
      }
    },
    setPublisherNameState: (data) => {
      return {
        type: ACTIONS.SET_PUBLISHER_NAME,
        payload: data
      }
    },
    setPublisherStatusState: (status) => {
      return {
        type: ACTIONS.SET_PUBLISHER_STATUS,
        payload: status
      }
    }
  }

  useEffect(() => {
    const _fetch = async () => {
      try {
        let data = await PublisherService.list();
        dispatch(creator.setPublishersState(data));
      } catch (error) {
        //dispatch(returnErrors(error, "error"));
      }
    };
    _fetch();
    // eslint-disable-next-line
  }, []);

  const getPublisher = async (id) => {
    console.log("getPublisher", id);
    try {
      let data = await PublisherService.get(id);
      console.log("get data", data);
      dispatch(creator.setPublisher(data));
    } catch (error) {
      console.log(error);
    }
  }

  const savePublisher = (publisher) => {
    const _save = async () => {
      console.log("_save", publisher);
      let isNew = publisher.id === 0;
      let result = await PublisherService.save(publisher);
      dispatch(creator.setPublisher(result));
      let updatedPublishers = [];
      if (isNew) {
        updatedPublishers = [...state.publishers, result].sort();
      } else {
        updatedPublishers = state.publishers.map(
          publisher => publisher.id === result.id ? result : publisher
        );
      }
      dispatch(creator.setPublishersState(updatedPublishers));
      dispatch(creator.setPublisherStatusState("saved"));
      dispatch(creator.setPublisherStatusState(""));
    }
    if (state.status === "") {
      dispatch(creator.setPublisherStatusState("submitting"));
      _save();
    }
  }

  const deletePublisher = (id) => {
    const _del = async () => {
      let result = await PublisherService.delete(id);
      if (result === "deleted") {
        dispatch(creator.setPublisherDeletedState(id));
      }
    }
    _del();
  }

  const syncPublisherName = (name) => {
    dispatch(creator.setPublisherNameState(name));
  }

  return (<PublisherContext.Provider value={{
    publishers: state.publishers,
    publisher: state.publisher,
    status: state.status,
    getPublisher,
    savePublisher,
    syncPublisherName,
    deletePublisher
  }}>
    {children}
  </PublisherContext.Provider>);
}