import React from "react";
import Home from "./Home/Home";
import Register from "./Forms/Register";
import { Router } from "@reach/router";
import Login from "./Forms/Login";
import Search from "./ListPages/Search";
import Searchbar from "./Dash/Searchbar";
import Favorites from "./ListPages/Favorites";
import History from "./ListPages/History";
import SideBarLogic from "./SideBar/SideBarLogic";
import Cart from "./ListPages/Cart";
import Dash from "./Dash/Dash";
import RecipesForm from "./RecipeForm/RecipesForm";
import Recipe from "./Recipe";
import { paths, SB_AD } from "./Utility/appHelpers";
import AddPlan from "./AddPlan";
import DefaultHome from "./Home/DefaultHome";

const Routes = props => {
  return (
    <>
      <Router>
        <Dash
          path={paths[2]}
          exact
          {...props}
          Searchbar={<Searchbar {...props} />}
          ListBar={props.device ? null : <SideBarLogic {...props} />}
        >
          {props.user ? (
            <Home path={paths[2]} {...props} />
          ) : (
            <DefaultHome path="/" />
          )}
          <Search path={`${SB_AD}/search/:query`} {...props} />
          <Favorites path={paths[3]} />
          <Cart path={paths[1]} />
          <History path={paths[4]} />
          <AddPlan path="/grocery/addplan/:mo/:ye/:dy" {...props} />
          <RecipesForm path={paths[0]} {...props} />
          <Recipe path={`${SB_AD}/recipe/:id`} />
          <Register path={`${SB_AD}/register`} setUser={props.setUser} />
          <Login path={`${SB_AD}/login`} setUser={props.setUser} />
        </Dash>
      </Router>
    </>
  );
};

export default Routes;
