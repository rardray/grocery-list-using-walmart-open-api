import React from "react";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "../Styles/main.css";
import Menu from "./Menu";
import MenuList from "./MenuList";
import cookie from "react-cookies";
import Licon from "./licon";

export default function Dash(props) {
  const handleLogout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    cookie.remove("grocery-api", { path: "/" });
    navigate("/grocery/login");
    props.logOutUser();
  };

  const handleCartIcon = e => navigate("/grocery/cart");

  return (
    <div>
      <NavBar>
        <h1 id="page-title-c">F</h1>
        <h2 id="page-title">undrayz Grocery</h2>
        {props.user ? (
          <div>
            {props.Searchbar}

            <Licon history={props.history} handleCartIcon={handleCartIcon} />
            <Menu>
              <MenuList
                header={
                  <Link className="nav-link" to="/">
                    {props.user.firstName + " " + props.user.lastName || "Home"}
                  </Link>
                }
              >
                <Link className="nav-link" to="grocery/history">
                  History
                </Link>
                <Link className="nav-link" to="grocery/favorites">
                  Favorites
                </Link>
                <p className="nav-link" onClick={handleLogout}>
                  Log Out
                </p>
              </MenuList>
            </Menu>
          </div>
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
      {props.user ? props.ListBar : null}
      {props.children}
    </div>
  );
}
