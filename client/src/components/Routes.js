import React from "react";
import Home from "./Home/Home";
import Register from "./Forms/Register";
import { Router, Location } from "@reach/router";
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
import ChangeUserSettings from "./ChangeUserSettings";
import ChangePassword from "./ChangePassword";
import TopLevelListUpdates from "./Utility/TopLevelListUpdates";
const Routes = props => {
  return (
    <>
      {props.user ? <TopLevelListUpdates {...props} /> : null}
      <Location>
        {({ location }) => (
          <Dash
            locKey={location.key}
            {...props}
            Searchbar={<Searchbar {...props} />}
            ListBar={props.device ? null : <SideBarLogic {...props} />}
          >
            <Router location={location}>
              {props.user ? (
                <Home path={paths[2]} {...props} />
              ) : (
                <DefaultHome path="/" />
              )}
              <Search path={`${SB_AD}/search/:query`} {...props} />
              <Favorites path={paths[3]} {...props} />
              <Cart path={paths[1]} {...props} />
              <History path={paths[4]} {...props} />
              <AddPlan
                path={`${SB_AD}/addplan/:mo/:ye/:dy`}
                {...props}
                main=""
                sideOne=""
                sideTwo=""
              />
              <RecipesForm path={paths[0]} {...props} />
              <EditPlan path={`${SB_AD}/meal/edit/:id`} {...props} />
              <Recipe path={`${SB_AD}/recipe/:id`} {...props} spacing={true} />
              <Meal path={`${SB_AD}/meal/:id`} {...props} />
              <Register path={`${SB_AD}/register`} setUser={props.setUser} />
              <Login path={`${SB_AD}/login`} setUser={props.setUser} />
              <Settings path={`${SB_AD}/settings`} {...props} />
              <ChangeUserSettings path={`${SB_AD}/update`} {...props} />
              <ChangePassword path={`${SB_AD}/changepassword`} {...props} />
            </Router>
          </Dash>
        )}
      </Location>
    </>
  );
};

export default Routes;
