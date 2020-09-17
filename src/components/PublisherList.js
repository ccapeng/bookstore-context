import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { PublisherContext } from "../context/PublisherState";
import { TabContext } from "../context/TabState";

const PublisherList = () => {

  const { publishers, deletePublisher } = useContext(PublisherContext);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    setTab("publisher");
    // eslint-disable-next-line
  }, []);

  const onDeletePublisher = (id) => {
    deletePublisher(id);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Publishers</h1>
        <Link to="/publisher/add/" className="ml-auto">Add Publisher</Link>
      </section>
      <ul className="list-group mt-5">
        {publishers.map(publisher =>
          <li key={publisher.id} className="list-group-item d-flex">
            <Link to={`/publisher/${publisher.id}/`}>
              {publisher.name}
            </Link>
            <button
              className="btn btn-secondary ml-auto"
              onClick={() => onDeletePublisher(publisher.id)}
            >
              Delete
            </button>
          </li>
        )}
      </ul>
    </>
  )
};

export default PublisherList;