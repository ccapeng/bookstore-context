import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { PublisherContext } from "../context/PublisherState";
import { TabContext } from "../context/TabState";

const Publisher = props => {

  const {
    status,
    publisher,
    getPublisher,
    savePublisher,
    syncPublisherName
  } = useContext(PublisherContext);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    const _fetch = async () => {
      let publisherId = props.match.params.id;
      if (typeof (publisherId) !== "undefined") {
        getPublisher(publisherId);
      }
    }
    setTab("publisher");
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeName = (value) => {
    syncPublisherName(value);
  }

  const save = () => {
    console.log("save", publisher);
    savePublisher(publisher);
  }


  if (status === "saved") {
    return (<Redirect to="/publishers"></Redirect>);
  }

  return (
    <>
      <section className="d-flex adjust-items-center">
        <h1>Publisher Editor</h1>
        <Link to="/publishers" className="ml-auto">Publishers</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Publisher Name</label>
            <input
              type="text"
              name="publisher"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={publisher.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="publisherId" value={publisher.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )

};

export default Publisher;