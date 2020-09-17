import React, { createContext, useEffect, useReducer } from 'react';
import { AuthorReducer } from './AuthorReducer';
import { ACTIONS } from './types';
import AuthorService from "../services/author.js";

// Initial state
const initialState = {
  authors: [],
  author: {
    id: 0,
    lastName: "",
    firstName: ""
  },
  status: ""
}

// Create context
export const AuthorContext = createContext(initialState);

// Provider component
export const AuthorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthorReducer, initialState);

  const creator = {
    setAuthors: (data) => {
      return {
        type: ACTIONS.SET_AUTHORS,
        payload: data
      }
    },

    setAuthorsDelete: (id) => {
      return {
        type: ACTIONS.SET_AUTHOR_DELETED,
        payload: id
      }
    },

    setAuthor: (data) => {
      return {
        type: ACTIONS.SET_AUTHOR,
        payload: data
      }
    },

    initAuthor: () => {
      return {
        type: ACTIONS.INIT_AUTHOR,
        payload: initialState.author
      }
    },

    setAuthorValue: (key, value) => {
      return {
        type: ACTIONS.SET_AUTHOR_VALUE,
        payload: {
          [key]: value
        }
      }
    },

    setAuthorStatus: (status) => {
      return {
        type: ACTIONS.SET_AUTHOR_STATUS,
        payload: status
      }
    }
  }
  useEffect(() => {
    const _fetch = async () => {
      try {
        let data = await AuthorService.list();
        dispatch(creator.setAuthors(data));
      } catch (error) {
        //dispatch(returnErrors(error, "error"));
      }
    };
    _fetch();
    // eslint-disable-next-line
  }, []);

  const getAuthor = async (id) => {
    console.log("getAuthor", id);
    try {
      let data = await AuthorService.get(id);
      console.log("get data", data);
      dispatch(creator.setAuthor(data));
    } catch (error) {
      console.log(error);
    }

  }

  const saveAuthor = (author) => {
    const _save = async () => {
      console.log("_save", author);
      let isNew = author.id === 0;
      let result = await AuthorService.save(author);
      dispatch(creator.setAuthor(result));
      let updatedAuthors = [];
      if (isNew) {
        updatedAuthors = [...state.authors, result].sort();
      } else {
        updatedAuthors = state.authors.map(
          author => author.id === result.id ? result : author
        );
      }
      dispatch(creator.setAuthors(updatedAuthors));
      dispatch(creator.setAuthorStatus("saved"));
      dispatch(creator.setAuthorStatus(""));
    }
    if (state.status === "") {
      dispatch(creator.setAuthorStatus("submitting"));
      _save();
    }
  }

  const deleteAuthor = (id) => {
    const _del = async () => {
      let result = await AuthorService.delete(id);
      if (result === "deleted") {
        dispatch(creator.setAuthorsDelete(id));
      }
    }
    _del();
  }

  const syncAuthorValue = (key, value) => {
    dispatch(creator.setAuthorValue(key, value));
  }

  return (<AuthorContext.Provider value={{
    authors: state.authors,
    author: state.author,
    status: state.status,
    getAuthor,
    saveAuthor,
    syncAuthorValue,
    deleteAuthor
  }}>
    {children}
  </AuthorContext.Provider>);
}