import React from "react";
import Home from "./Home/Home";
import Register from "./Forms/Register";
import { Router } from "@reach/router";
import Login from "./Forms/Login";
import Search from "./ListPages/Search";
import Searchbar from "./Dash/Searchbar";
import Items from "./ListPages/Items";
import Favorites from "./ListPages/Favorites";
import History from "./ListPages/History";
import Loader from "./Loader";
import SideBarLogic from "./SideBar/SideBarLogic";
import Cart from "./ListPages/Cart";
import Dash from "./Dash/Dash";

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
              addFavorite={addFavoriteFromSearch}
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
                    addFavorite={addFavoriteFromSearch.bind(this, i, el)}
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
