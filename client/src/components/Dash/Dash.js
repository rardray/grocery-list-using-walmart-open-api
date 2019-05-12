import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "../Styles/main.css";
import Menu from "./Menu";
import MenuList from "./MenuList";
import cookie from "react-cookies";
import Licon from "./licon";
import title from "../Styles/title.svg";
import menuicon from "../Styles/Untitled.svg";
import Footer from "./Footer";
import "../Styles/menu.css";
import List from "../Styles/list.svg";
import SwipeFunction from "./SwipeFunction";
import NavList from "./NavList";
import MainContainer from "./MainContainer";
import { paths, SB_AD } from "../Utility/appHelpers";
import BackButton from "./BackButton";

export default function Dash(props) {
  const [path, setPath] = useState(null);

  useEffect(() => {
    setPath(window.location.pathname);
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
            <div id="p-search" className={"show-search"}>
              {props.Searchbar}
            </div>
            <Licon
              cart={props.cart}
              handleCartIcon={handleCartIcon}
              svgs={List}
            />
            <Menu image={menuicon}>
              <MenuList>
                <Link to={`${SB_AD}/settings`} className="nav-link">
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
      {props.user ? (
        <SwipeFunction device={props.device}>
          <MainContainer device={props.device}>
            {props.user ? props.ListBar : null}
            {props.children}
            <Footer user={props.user} handleLogout={handleLogout} />
          </MainContainer>
        </SwipeFunction>
      ) : (
        <MainContainer device={props.device}>
          {props.children}
          <Footer user={props.user} handleLogout={handleLogout} />
        </MainContainer>
      )}
    </>
  );
}
