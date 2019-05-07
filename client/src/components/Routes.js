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
import { paths, SB_AD } from "./Utility/appHelpers";
import AddPlan from "./AddPlan";

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
    getList,
    transition
  } = props;
  return (
    <Router>
      <Dash
        path={paths[2]}
        exact
        {...{ user, logOutUser, history, window, transition }}
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
        <Home path={paths[2]} user={user} addToList={addToList} />
        <Search
          path={`${SB_AD}/search/:query`}
          {...{
            productSearch,
            handleQuantity,
            addToList,
            handleDrag,
            addFavoriteFromSearch
          }}
        />
        <Favorites
          path={paths[3]}
          {...{
            history,
            handleQuantity,
            addToList,
            handleDrag,
            addFavoriteFromSearch
          }}
        />
        <Cart
          path={paths[1]}
          history={history}
          handleQuantity={handleQuantity}
          handleDelete={handleDelete}
          handleDrag={handleDrag}
          addFavoriteFromSearch={addFavoriteFromSearch}
          getList={getList}
          clearList={clearList}
        />
        <History
          path={paths[4]}
          {...{
            handleDrag,
            history,
            addToList,
            handleQuantity,
            addFavoriteFromSearch
          }}
        />

        <AddPlan path="/grocery/addplan/:mo/:ye/:dy" history={history} />
        <RecipesForm path={paths[0]} {...props} />
        <Recipe path={`${SB_AD}/recipe/:id`} {...props} />
        <Register
          path={`${SB_AD}/register`}
          setUser={props.setUser}
          getList={getList}
        />
        <Login
          path={`${SB_AD}/login`}
          setUser={props.setUser}
          getList={getList}
        />
      </Dash>
    </Router>
  );
};

export default Routes;
