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
      <NavBar>
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
                <Link className="nav-link" to="grocery/history">
                  History
                </Link>
                <Link className="nav-link" to="grocery/favorites">
                  Favorites
                </Link>
                <Link className="nav-link" to="grocery/addrecipe">
                  Add Recipe
                </Link>
                <p className="nav-link" onClick={handleLogout}>
                  Log Out
                </p>
              </MenuList>
            </Menu>
          </>
        ) : (
          <div>
            <Link className="nav-link-log" to="grocery/register">
              Register
            </Link>
            <Link className="nav-link-log" to="grocery/login">
              Log In
            </Link>
          </div>
        )}
      </NavBar>
      <div
        style={{
          background: "white",
          margin: "auto",
          display: "inline-block",
          position: "relative",
          minWidth: "90%",
          maxWidth: props.window ? "100%" : "90%",
          textAlign: "center"
        }}
      >
        {props.user ? props.ListBar : null}
        {props.children}
        <Footer user={props.user} />
      </div>
    </>
  );
}
