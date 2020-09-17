import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { AuthorContext } from "../context/AuthorState";
import { TabContext } from "../context/TabState";

const Author = props => {

  const {
    status,
    author,
    getAuthor,
    saveAuthor,
    syncAuthorValue
  } = useContext(AuthorContext);

  const { setTab } = useContext(TabContext);

  useEffect(() => {
    const _fetch = async () => {
      let authorId = props.match.params.id;
      if (typeof (authorId) !== "undefined") {
        getAuthor(authorId);
      }
    }
    setTab("author");
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeValue = (key, value) => {
    syncAuthorValue(key, value);
  }

  const save = () => {
    console.log("save", author);
    saveAuthor(author);
  }

  if (status === "saved") {
    return (<Redirect to="/authors" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Author Editor</h1>
        <Link to="/authors" className="ml-auto">Authors</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={(event) => { onChangeValue(event.target.name, event.target.value) }}
              value={author.lastName}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={(event) => { onChangeValue(event.target.name, event.target.value) }}
              value={author.firstName}
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="authorId" value={author.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Author;