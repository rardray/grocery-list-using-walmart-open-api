import React, { useState, useEffect, useContext } from "react";
import NavBar from "./Navigator/NavBar";
import { Link, navigate } from "@reach/router";
import "../Styles/main.css";
import Menu from "./Menu/Menu";
import MenuList from "./Menu/MenuList";
import cookie from "react-cookies";
import Licon from "./Navigator/licon";
import title from "../Styles/title.svg";
import menuicon from "../Styles/Untitled.svg";
import Footer from "./Footer/Footer";
import "../Styles/menu.css";
import List from "../Styles/list.svg";
import SwipeFunction from "./SwipeFunction";
import NavList from "./Navigator/NavList";
import MainContainer from "./MainContainer";
import { paths, SB_AD } from "../Utility/appHelpers";
import BackButton from "./BackButton";
import CartContext from "../contextComponents/cart.context";
import TopLevelListUpdates from "../Utility/TopLevelListUpdates";
import SearchContainer from "./Navigator/SearchContainer";
import Gear from "../Gear";
import AnimationWrapper from "../AnimationWrapper";

export default function Dash(props) {
  const [path, setPath] = useState(null);
  const { cart } = useContext(CartContext);
  useEffect(() => {
    function path() {
      return setPath(window.location.pathname);
    }
    path();
  });
  const handleLogout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    cookie.remove("grocery-api", { path: "/" });
    navigate(`${SB_AD}/login`);
    props.logOutUser();
  };
  const handleCartIcon = e => navigate(paths[1]);

  return (
    <>
      <NavBar NavList={props.user ? <NavList {...{ path }} /> : null}>
        <img src={title} id="page-title" style={{ width: 45 }} alt="search" />
        {props.device ? null : <h2>fundrays grocery</h2>}
        {props.user ? (
          <>
            <BackButton {...{ path }} />
            <div className="p-search">
              <SearchContainer>{props.Searchbar}</SearchContainer>
            </div>
            <Licon cart={cart} handleCartIcon={handleCartIcon} svgs={List} />
            <Menu image={menuicon}>
              <MenuList>
                <Link to={`${SB_AD}/settings`} className="nav-link">
                  <Gear />
                  Settings...
                </Link>
                <p className="nav-link" onClick={handleLogout}>
                  Log Out
                </p>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Link className="nav-link-log" to={`${SB_AD}/register`}>
              Register
            </Link>
            <Link className="nav-link-log" to={`${SB_AD}/login`}>
              Log In
            </Link>
          </>
        )}
      </NavBar>
      <MainContainer device={props.device} min={"100%"}>
        {props.user ? (
          <SwipeFunction device={props.device}>
            <AnimationWrapper>
              <TopLevelListUpdates user={props.user} />
              <MainContainer device={props.device} min={"95%"}>
                {props.user ? props.ListBar : null}
                {props.children}
                <Footer user={props.user} handleLogout={handleLogout} />
              </MainContainer>
            </AnimationWrapper>
          </SwipeFunction>
        ) : (
          <MainContainer device={props.device}>
            {props.children}
            <Footer user={props.user} handleLogout={handleLogout} />
          </MainContainer>
        )}
      </MainContainer>
    </>
  );
}
