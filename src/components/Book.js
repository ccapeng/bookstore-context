import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { BookContext } from "../context/BookState";
import { CategoryContext } from "../context/CategoryState";
import { PublisherContext } from "../context/PublisherState";
import { AuthorContext } from "../context/AuthorState";
import { TabContext } from "../context/TabState";

const Book = props => {

  const {
    status,
    book,
    initBook,
    getBook,
    saveBook,
    syncBookValue
  } = useContext(BookContext);
  const { categories } = useContext(CategoryContext);
  const { publishers } = useContext(PublisherContext);
  const { authors } = useContext(AuthorContext);
  const { setTab } = useContext(TabContext);
  useEffect(() => {
    const _fetch = async () => {
      let bookId = props.match.params.id;
      if (typeof (bookId) !== "undefined") {
        getBook(bookId);
      } else {
        initBook();
      }
    }
    setTab("book");
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeValue = (key, value) => {
    syncBookValue(key, value);
  }

  const save = () => {
    saveBook(book);
  }

  if (status === "saved") {
    return (<Redirect to="/books" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Book Editor</h1>
        <Link to="/books/" className="ml-auto">Books</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              onChange={event => onChangeValue(event.target.name, event.target.value)}
              value={book.title || ""}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={event => onChangeValue(event.target.name, event.target.value)}
              value={book.category || ""}
            >
              <option value="0"> --- </option>
              {categories.map(category =>
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Publisher</label>
            <select
              name="publisher"
              className="form-control"
              onChange={event => onChangeValue(event.target.name, event.target.value)}
              value={book.publisher || ""}
            >
              <option value="0"> --- </option>
              {publishers.map(publisher =>
                <option value={publisher.id} key={publisher.id}>
                  {publisher.name}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label>Author</label>
            <select
              name="author"
              className="form-control"
              value={book.author || ""}
              onChange={event => onChangeValue(event.target.name, event.target.value)}
            >
              <option value="0"> --- </option>
              {authors.map(author =>
                <option value={author.id} key={author.id}>
                  {author.lastName}, {author.firstName}
                </option>
              )}
            </select>
          </div>
          <div className="form-group">
            <input type="hidden" name="bookId" value={book.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Book;