import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BookContext } from "../context/BookState";
import { TabContext } from "../context/TabState";

const BookList = () => {

  const { books, deleteBook } = useContext(BookContext);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    setTab("book");
    // eslint-disable-next-line
  }, []);

  const onDeleteBook = (id) => {
    deleteBook(id);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Books</h1>
        <Link to="/book/add/" className="ml-auto">Add Book</Link>
      </section>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Book</th>
            <th>Category</th>
            <th>Publisher</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            <tr key={book.id}>
              <td>
                <Link to={`/book/${book.id}/`}>{book.title}</Link>
              </td>
              <td>
                {book.categoryName}
              </td>
              <td>
                {book.publisherName}
              </td>
              <td>
                {book.authorFirstName} {book.authorLastName}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteBook(book.id) }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
};

export default BookList;