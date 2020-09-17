import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthorContext } from "../context/AuthorState";
import { TabContext } from "../context/TabState";

const Author = () => {

  const { authors, deleteAuthor } = useContext(AuthorContext);
  const { setTab } = useContext(TabContext);
  console.log("authors", authors)
  useEffect(() => {
    setTab("author");
    // eslint-disable-next-line
  }, []);

  const onDeleteAuthor = (id) => {
    deleteAuthor(id);
  }

  return (
    <>

      <section className="d-flex align-items-center">
        <h1>Authors</h1>
        <Link to="/author/add/" className="ml-auto">Add Author</Link>
      </section>
      <ul className="list-group mt-5">
        {authors.map(author =>
          <li key={author.id} className="list-group-item d-flex">
            <div>
              <Link to={`/author/${author.id}/`}>{author.lastName}, {author.firstName}</Link>
            </div>
            <button
              className="btn btn-secondary ml-auto"
              onClick={() => onDeleteAuthor(author.id)}
            >
              Delete
              </button>
          </li>
        )}
      </ul>
    </>
  )

};

export default Author;