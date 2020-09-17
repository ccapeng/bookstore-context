import { ACTIONS } from "./types";

export const BookReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    case ACTIONS.SET_BOOK_DELETED:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      }
    case ACTIONS.SET_BOOK:
      let book = action.payload;
      if (book.category === null) {
        book.category = 0;
      }
      if (book.publisher === null) {
        book.publisher = 0;
      }
      if (book.author === null) {
        book.author = 0;
      }
      return {
        ...state,
        book: book
      };
    case ACTIONS.INIT_BOOK:
      return {
        ...state,
        author: action.payload
      };

    case ACTIONS.SET_BOOK_VALUE:
      return {
        ...state,
        book: {
          ...state.book,
          ...action.payload
        }
      };

    case ACTIONS.SET_BOOK_STATUS:
      return {
        ...state,
        status: action.payload
      };


    default:
      return state;
  }
}