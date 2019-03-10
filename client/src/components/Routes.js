import React from "react";
import Home from "./Home";
import List from "./List";
import Register from "./Register";
import { Router } from "@reach/router";
import Login from "./Login";
import Search from "./Search";
import Searchbar from "./Searchbar";
import Items from "./Items";

const Routes = props => {
  const {
    productSearch,
    query,
    handleChange,
    searchSubmit,
    user,
    handleQuantity
  } = props;
  return (
    <Router>
      <Home
        path="/"
        user={user}
        Searchbar={
          <Searchbar
            handleChange={handleChange}
            query={query}
            searchSubmit={searchSubmit}
          />
        }
      >
        <Register path="register" />
        <Login path="login" />
        <Search
          path="search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
        />
      </Home>
    </Router>
  );
};

export default Routes;
