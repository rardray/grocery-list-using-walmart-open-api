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
import Cart from "./Cart";
import Dash from "./Dash";

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
      <Dash
        path="/"
        exact
        user={user}
        logOutUser={logOutUser}
        history={history}
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
        <Home path="/" user={user} />
        <Search
          path="grocery/search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
          addToList={addToList}
          handleDrag={handleDrag}
          addFavoriteFromSearch={addFavoriteFromSearch}
        />
        {pageLoad ? (
          <Favorites
            path="grocery/favorites"
            history={history}
            handleQuantity={handleQuantity}
            addToList={addToList}
            handleDrag={handleDrag}
            addFavoriteFromSearch={addFavoriteFromSearch}
          />
        ) : (
          <Loader path="grocery/favorites" />
        )}
        {pageLoad ? (
          <Cart
            path="grocery/cart"
            history={history}
            handleQuantity={handleQuantity}
            handleDelete={handleDelete}
            handleDrag={handleDrag}
            addFavoriteFromSearch={addFavoriteFromSearch}
          />
        ) : (
          <Loader path="grocery/cart" />
        )}
        {pageLoad ? (
          <History
            path="grocery/history"
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
                    action={addToList.bind(this, i, el)}
                    bLabel="ADD TO CART"
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
          <Loader path="grocery/history" />
        )}
        <Register path="grocery/register" />
        <Login path="grocery/login" setUser={props.setUser} getList={getList} />
      </Dash>
    </Router>
  );
};

export default Routes;
