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
import SideBarLogic from "./SideBarLogic";

const Routes = props => {
  const {
    productSearch,
    query,
    handleChange,
    searchSubmit,
    user,
    handleQuantity,
    addToList,
    handleDrag,
    onDragOver,
    handleDrop,
    handleDelete,
    history,
    clearList,
    pageLoad,
    addFavorite,
    addFavoriteFromSearch,
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
          <SideBarLogic
            onDragOver={onDragOver}
            handleDrop={handleDrop}
            clearList={clearList}
            pageLoad={pageLoad}
            history={history}
            handleDelete={handleDelete}
            addFavorite={addFavorite}
            addToList={addToList}
          />
        }
      >
        <Search
          path="search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
          addToList={addToList}
          handleDrag={handleDrag}
          addFavoriteFromSearch={addFavoriteFromSearch}
        />
        {pageLoad ? (
          <History
            path="history"
            history={history}
            pageLoad={pageLoad}
            historyItems={history.map((el, i) => {
              return (
                <div key={el.id} id="list-block">
                  <Items
                    id={el.id}
                    image={el.image}
                    handleDrag={handleDrag.bind(this, i, el)}
                    title={el.title}
                    addToList={addToList.bind(this, i, el)}
                    handleQuantity={handleQuantity.bind(this, i, "history")}
                    count={el.count}
                    addFavorite={addFavorite.bind(this, i, el)}
                    favorite={el.favorite}
                  />
                </div>
              );
            })}
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
