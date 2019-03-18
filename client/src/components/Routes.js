import React from "react";
import Home from "./Home";
import Register from "./Register";
import { Router } from "@reach/router";
import Login from "./Login";
import Search from "./Search";
import Searchbar from "./Searchbar";
import Items from "./Items";
import Favorites from "./Favorites";
import History from "./History";
import Loader from "./Loader";
import SideBarLogic from "./SideBarLogic";
import $ from "jquery";

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
    window,
    logOutUser,
    getList
  } = props;
  return (
    <Router>
      <Home
        path="/"
        user={user}
        logOutUser={logOutUser}
        Searchbar={
          <Searchbar
            handleChange={handleChange}
            query={query}
            searchSubmit={searchSubmit}
          />
        }
        ListBar={
          window ? null : (
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
          )
        }
      >
        <Search
          path="/search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
          addToList={addToList}
          handleDrag={handleDrag}
          addFavoriteFromSearch={addFavoriteFromSearch}
        />
        {pageLoad ? (
          <Favorites
            path="/favorites"
            history={history}
            handleQuantity={handleQuantity}
            addToList={addToList}
            handleDrag={handleDrag}
            addFavoriteFromSearch={addFavoriteFromSearch}
          />
        ) : (
          <Loader path="/favorites" />
        )}
        {pageLoad ? (
          <History
            path="/history"
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
          <Loader path="/history" />
        )}
        <Register path="/register" />
        <Login path="/login" setUser={props.setUser} getList={getList} />
      </Home>
    </Router>
  );
};

export default Routes;
