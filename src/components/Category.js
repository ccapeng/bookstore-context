import React, { useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { CategoryContext } from "../context/CategoryState";
import { TabContext } from "../context/TabState";

export const Category = props => {

  const {
    status,
    category,
    getCategory,
    initCategory,
    saveCategory,
    syncCategoryName
  } = useContext(CategoryContext);
  const { setTab } = useContext(TabContext);

  useEffect(() => {
    const _fetch = async () => {
      let categoryId = props.match.params.id;
      if (typeof (categoryId) !== "undefined") {
        getCategory(categoryId);
      } else {
        initCategory();
      }
    }
    setTab("category");
    _fetch();
    // eslint-disable-next-line
  }, []);

  const onChangeName = (value) => {
    syncCategoryName(value);
  }

  const save = () => {
    console.log("save", category);
    saveCategory(category);
  }

  if (status === "saved") {
    return (<Redirect to="/categories" />);
  }

  return (
    <>
      <section className="d-flex align-items-center">
        <h1>Category Editor</h1>
        <Link to="/categories" className="ml-auto">Categories</Link>
      </section>
      <section className="mt-3">
        <form onSubmit={(event) => { event.preventDefault(); save() }}>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="category"
              className="form-control"
              onChange={(event) => { onChangeName(event.target.value) }}
              value={category.name}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input type="hidden" name="categoryId" value={category.id} />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
};

export default Category;