import React, { createContext, useEffect, useReducer } from 'react';
import { BookReducer } from './BookReducer';
import { ACTIONS } from './types';
import BookService from "../services/book.js";

// Initial state
const initialState = {
  books: [],
  book: {
    id: 0,
    name: ""
  },
  status: ""
}

// Create context
export const BookContext = createContext(initialState);

// Provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookReducer, initialState);

  const creator = {
    setBooks: (data) => {
      return {
        type: ACTIONS.SET_BOOKS,
        payload: data
      }
    },
    setBooksDelete: (id) => {
      return {
        type: ACTIONS.SET_BOOK_DELETED,
        payload: id
      }
    },

    setBook: (data) => {
      return {
        type: ACTIONS.SET_BOOK,
        payload: data
      }
    },

    initBook: () => {
      return {
        type: ACTIONS.INIT_BOOK,
        payload: initialState.book
      }
    },
    setBookValue: (key, value) => {
      return {
        type: ACTIONS.SET_BOOK_VALUE,
        payload: {
          [key]: value
        }
      }
    },
    setBookStatus: (status) => {
      return {
        type: ACTIONS.SET_BOOK_STATUS,
        payload: status
      }
    }
  }

  const fetchBookList = async () => {
    try {
      let data = await BookService.list();
      dispatch(creator.setBooks(data));
    } catch (error) {
      //dispatch(returnErrors(error, "error"));
    }
  };

  useEffect(() => {
    fetchBookList();
    // eslint-disable-next-line
  }, []);

  const getBook = async (id) => {
    try {
      let data = await BookService.get(id);
      console.log("get data", data);
      dispatch(creator.setBook(data));
    } catch (error) {
      console.log(error);
    }

  }

  const saveBook = (book) => {
    const _save = async () => {
      console.log("_save", book);
      let isNew = book.id === 0;
      let result = await BookService.save(book);
      dispatch(creator.setBook(result));
      let updatedBooks = [];
      if (isNew) {
        updatedBooks = [...state.books, result].sort();
      } else {
        updatedBooks = state.books.map(
          book => book.id === result.id ? result : book
        );
      }
      //dispatch(creator.setBooks(updatedBooks));
      fetchBookList();
      dispatch(creator.setBookStatus("saved"));
      dispatch(creator.setBookStatus(""));
    }
    if (state.status === "") {
      dispatch(creator.setBookStatus("submitting"));
      _save();
    }
  }

  const deleteBook = (id) => {
    const _del = async () => {
      let result = await BookService.delete(id);
      if (result === "deleted") {
        dispatch(creator.setBooksDelete(id));
      }
    }
    _del();
  }

  const syncBookValue = (key, value) => {
    dispatch(creator.setBookValue(key, value));
  }

  return (<BookContext.Provider value={{
    books: state.books,
    book: state.book,
    status: state.status,
    getBook,
    saveBook,
    syncBookValue,
    deleteBook
  }}>
    {children}
  </BookContext.Provider>);
}