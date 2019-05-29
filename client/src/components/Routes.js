import React from "react";
import Home from "./Home/Home";
import Register from "./Forms/Register";
import { Router } from "@reach/router";
import Login from "./Forms/Login";
import Search from "./ListPages/Search";
import Searchbar from "./Dash/Navigator/Searchbar";
import Favorites from "./ListPages/Favorites";
import History from "./ListPages/History";
import SideBarLogic from "./SideBar/SideBarLogic";
import Cart from "./ListPages/Cart";
import Dash from "./Dash/Dash";
import RecipesForm from "./RecipeForm/RecipesForm";
import Recipe from "./Recipe/Recipe";
import { paths, SB_AD } from "./Utility/appHelpers";
import AddPlan from "./Meal/AddPlan";
import Meal from "./Meal/Meal";
import DefaultHome from "./Home/DefaultHome";
import EditPlan from "./Meal/EditPlan";
import Settings from "./Settings";

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
          <AddPlan
            path={`${SB_AD}/addplan/:mo/:ye/:dy`}
            {...props}
            main=""
            sideOne=""
            sideTwo=""
          />
          <RecipesForm path={paths[0]} {...props} />
          <EditPlan path={`${SB_AD}/meal/edit/:id`} {...props} />
          <Recipe path={`${SB_AD}/recipe/:id`} spacing={true} />
          <Meal path={`${SB_AD}/meal/:id`} {...props} />
          <Register path={`${SB_AD}/register`} setUser={props.setUser} />
          <Login path={`${SB_AD}/login`} setUser={props.setUser} />
          <Settings path={`${SB_AD}/settings`} />
        </Dash>
      </Router>
    </>
  );
};

export default Routes;
