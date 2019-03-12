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
    historyCount,
    clearList
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
            <List groceryList={groceryList} handleDelete={handleDelete} />
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
        <History
          path="history"
          history={history}
          handleQuantity={historyCount}
          addToList={addToList}
          handleDrag={handleDrag}
        />
      </Home>
      <Register path="register" />
      <Login path="login" setUser={props.setUser} />
    </Router>
  );
};

export default Routes;
