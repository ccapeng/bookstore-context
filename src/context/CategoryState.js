import React, { createContext, useEffect, useReducer } from 'react';
import { CategoryReducer } from './CategoryReducer';
import { ACTIONS } from './types';
import CategoryService from "../services/category.js";

// Initial state
const initialState = {
  categories: [],
  category: {
    id: 0,
    name: ""
  },
  status: ""
}

// Create context
export const CategoryContext = createContext(initialState);

// Provider component
export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const creator = {
    setCategories: (data) => {
      return {
        type: ACTIONS.SET_CATEGORIES,
        payload: data
      }
    },
    setCategoryDeleted: (id) => {
      return {
        type: ACTIONS.SET_CATEGORY_DELETED,
        payload: id
      }
    },
    setCategory: (data) => {
      return {
        type: ACTIONS.SET_CATEGORY,
        payload: data
      }
    },
    initCategory: () => {
      return {
        type: ACTIONS.INIT_CATEGORY,
        payload: initialState.category
      }
    },
    setCategoryName: (data) => {
      return {
        type: ACTIONS.SET_CATEGORY_NAME,
        payload: data
      }
    },
    setCategoryStatus: (status) => {
      console.log("setCategoryStatus", status);
      return {
        type: ACTIONS.SET_CATEGORY_STATUS,
        payload: status
      }
    }
  }

  useEffect(() => {
    const _fetch = async () => {
      try {
        let data = await CategoryService.list();
        dispatch(creator.setCategories(data));
      } catch (error) {
        //dispatch(returnErrors(error, "error"));
      }
    };
    _fetch();
    // eslint-disable-next-line
  }, []);

  const getCategory = async (id) => {
    console.log("getCategory", id);
    try {
      let data = await CategoryService.get(id);
      console.log("get data", data);
      dispatch(creator.setCategory(data));
    } catch (error) {
      console.log(error);
    }

  }

  const initCategory = () => {
    dispatch(creator.initCategory());
  }

  const saveCategory = (category) => {
    const _save = async () => {
      console.log("_save", category);
      let isNew = category.id === 0;
      let result = await CategoryService.save(category);
      dispatch(creator.setCategory(result));
      let updatedCategories = [];
      if (isNew) {
        updatedCategories = [...state.categories, result].sort();
      } else {
        updatedCategories = state.categories.map(
          category => category.id === result.id ? result : category
        );
      }
      dispatch(creator.setCategories(updatedCategories));
      dispatch(creator.setCategoryStatus("saved"));
      dispatch(creator.setCategoryStatus(""));
    }
    if (state.status === "") {
      dispatch(creator.setCategoryStatus("submitting"));
      _save();
    }
  }

  const deleteCategory = (id) => {
    const _del = async () => {
      let result = await CategoryService.delete(id);
      if (result === "deleted") {
        dispatch(creator.setCategoryDeleted(id));
      }
    }
    _del();
  }

  const syncCategoryName = (name) => {
    dispatch(creator.setCategoryName(name));
  }

  return (<CategoryContext.Provider value={{
    categories: state.categories,
    category: state.category,
    status: state.status,
    getCategory,
    initCategory,
    saveCategory,
    syncCategoryName,
    deleteCategory
  }}>
    {children}
  </CategoryContext.Provider>);
}