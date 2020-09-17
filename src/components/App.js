import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import CategoryList from "./CategoryList";
import Category from "./Category";
import PublisherList from "./PublisherList";
import Publisher from "./Publisher";
import AuthorList from "./AuthorList";
import Author from "./Author";
import BookList from "./BookList";
import Book from "./Book";

export const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/category/add/" component={Category} />
          <Route exact path="/category/:id/" component={Category} />
          <Route exact path="/categories/" component={CategoryList} />
          <Route exact path="/publisher/add/" component={Publisher} />
          <Route exact path="/publisher/:id/" component={Publisher} />
          <Route exact path="/publishers/" component={PublisherList} />
          <Route exact path="/author/add/" component={Author} />
          <Route exact path="/author/:id/" component={Author} />
          <Route exact path="/authors/" component={AuthorList} />
          <Route exact path="/book/add/" component={Book} />
          <Route exact path="/book/:id/" component={Book} />
          <Route exact path="/books/" component={BookList} />
          <Route exact path="/" component={BookList} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;