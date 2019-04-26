import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "../Styles/main.css";
import Menu from "./Menu";
import MenuList from "./MenuList";
import cookie from "react-cookies";
import Licon from "./licon";
import title from "../Styles/title.svg";
import searchicon from "../Styles/searchicon.svg";
import menuicon from "../Styles/Untitled.svg";
import Footer from "./Footer";
import "../Styles/menu.css";
import List from "../Styles/list.svg";
import $ from "jquery";
import SwipeFunction from "./SwipeFunction";
import NavList from "./NavList";
import MainContainer from "./MainContainer";

export default function Dash(props) {
  const [showSearch, setShowSearch] = useState(false);
  const handleLogout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    cookie.remove("grocery-api", { path: "/" });
    navigate("/grocery/login");
    props.logOutUser();
  };
  useEffect(() => {
    const focus = () => (showSearch ? $("#searchbar").focus() : null);
    focus();
  }, [showSearch]);
  const handleCartIcon = e => navigate("/grocery/cart");

  return (
    <>
      <NavBar NavList={props.user ? <NavList /> : null}>
        <img
          src={title}
          id="page-title"
          style={{ width: 45 }}
          alt="search"
          onClick={() => navigate("/")}
        />
        {props.window ? null : <h2>fundrays grocery</h2>}
        {props.user ? (
          <>
            <div
              id="p-search"
              className={showSearch ? "show-search" : "search-contain"}
            >
              {props.Searchbar}
            </div>
            <div
              className="menu-anchor"
              onClick={() => setShowSearch(!showSearch)}
            >
              <img src={searchicon} alt="search" />
            </div>
            <Licon
              history={props.history}
              handleCartIcon={handleCartIcon}
              svgs={List}
            />
            <Menu image={menuicon}>
              <MenuList>
                <Link to="/grocery/settings" className="nav-link">
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
            <Link className="nav-link-log" to="grocery/register">
              Register
            </Link>
            <Link className="nav-link-log" to="grocery/login">
              Log In
            </Link>
          </>
        )}
      </NavBar>
      {props.user ? (
        <SwipeFunction>
          <MainContainer window={props.window}>
            {props.user ? props.ListBar : null}
            {props.children}
            <Footer user={props.user} />
          </MainContainer>
        </SwipeFunction>
      ) : (
        <MainContainer window={props.window}>
          {props.children}
          <Footer user={props.user} />
        </MainContainer>
      )}
      )
    </>
  );
}
