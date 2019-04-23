import React from "react";
import Home from "./Home/Home";
import Register from "./Forms/Register";
import { Router } from "@reach/router";
import Login from "./Forms/Login";
import Search from "./ListPages/Search";
import Searchbar from "./Dash/Searchbar";
import Favorites from "./ListPages/Favorites";
import History from "./ListPages/History";
import Loader from "./Loader";
import SideBarLogic from "./SideBar/SideBarLogic";
import Cart from "./ListPages/Cart";
import Dash from "./Dash/Dash";
import RecipesForm from "./RecipeForm/RecipesForm";
import Recipe from "./Recipe";

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
        {...{ user, logOutUser, history, window }}
        Searchbar={<Searchbar {...{ handleChange, query, searchSubmit }} />}
        ListBar={
          window ? null : (
            <SideBarLogic
              {...{
                onDragOver,
                handleDrop,
                clearList,
                pageLoad,
                history,
                handleDelete,
                addToList
              }}
              addFavorite={addFavoriteFromSearch}
            />
          )
        }
      >
        <Home path="/" user={user} addToList={addToList} />
        <Search
          path="grocery/search/:query"
          {...{
            productSearch,
            handleQuantity,
            addToList,
            handleDrag,
            addFavoriteFromSearch
          }}
        />
        {pageLoad ? (
          <Favorites
            path="grocery/favorites"
            {...{
              history,
              handleQuantity,
              addToList,
              handleDrag,
              addFavoriteFromSearch
            }}
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
            getList={getList}
            clearList={clearList}
          />
        ) : (
          <Loader path="grocery/cart" />
        )}
        {pageLoad ? (
          <History
            path="grocery/history"
            {...{
              handleDrag,
              history,
              addToList,
              handleQuantity,
              addFavoriteFromSearch
            }}
          />
        ) : (
          <Loader path="grocery/history" />
        )}
        <RecipesForm path="grocery/addrecipe" {...props} />
        <Recipe path="grocery/recipe/:id" {...props} />
        <Register
          path="grocery/register"
          setUser={props.setUser}
          getList={getList}
        />
        <Login path="grocery/login" setUser={props.setUser} getList={getList} />
      </Dash>
    </Router>
  );
};

export default Routes;
