import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from "../context/CategoryState";
import { TabContext } from "../context/TabState";

export const CategoryList = () => {

  const { categories, deleteCategory } = useContext(CategoryContext);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    setTab("category");
    // eslint-disable-next-line
  }, []);

  const onDeleteCategory = (id) => {
    deleteCategory(id);
  }

  return (
    <div>
      <section className="mt-5 d-flex align-items-center">
        <h1>Categories</h1>
        <Link to="/category/add/" className="ml-auto">Add Category</Link>
      </section>
      <section>
        <ul className="list-group mt-3">
          {categories.map(category =>
            <li key={category.id} className="list-group-item d-flex">
              <div>
                <Link to={`/category/${category.id}/`}>{category.name}</Link>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => { onDeleteCategory(category.id) }}
                >
                  Delete
                  </button>
              </div>
            </li>
          )}
        </ul>
      </section>
    </div >
  )
}

export default CategoryList;