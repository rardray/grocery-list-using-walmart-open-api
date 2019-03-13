import React from "react";
import Home from "./Home";
import Register from "./Register";
import { Router } from "@reach/router";
import Login from "./Login";
import Search from "./Search";
import Searchbar from "./Searchbar";
import Items from "./Items";
import List from "./List";
import ListContainer from "./ListContainer";
import History from "./History";
import Loader from "./Loader";

const Routes = props => {
  const {
    productSearch,
    query,
    handleChange,
    searchSubmit,
    user,
    handleQuantity,
    groceryList,
    addToList,
    handleDrag,
    onDragOver,
    handleDrop,
    handleDelete,
    history,
    clearList,
    pageLoad,
    searchLoad
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
        ListBar={
          <ListContainer
            onDragOver={onDragOver}
            handleDrop={handleDrop}
            clearList={clearList}
          >
            {pageLoad ? (
              <List groceryList={groceryList} handleDelete={handleDelete} />
            ) : (
              <Loader />
            )}
          </ListContainer>
        }
      >
        <Search
          path="search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
          addToList={addToList}
          handleDrag={handleDrag}
        />
        {pageLoad ? (
          <History
            path="history"
            history={history}
            handleQuantity={handleQuantity}
            addToList={addToList}
            handleDrag={handleDrag}
            pageLoad={pageLoad}
          />
        ) : (
          <Loader path="history" />
        )}
      </Home>
      <Register path="register" />
      <Login path="login" setUser={props.setUser} />
    </Router>
  );
};

export default Routes;
