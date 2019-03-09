import React from "react";
import cookie from "react-cookies";
import List from "./List";
import NavBar from "./NavBar";
import { Link } from "@reach/router";
import "./Styles/main.css";
var Themes = require("./Styles/Themes");

class Home extends React.Component {
  state = {
    user: cookie.load("user") || null
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar>
          <Link className="nav-link" to="/">
            {user.firstName || "Home"}
          </Link>{" "}
          <span
            className="nav-link"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {" "}
            |{" "}
          </span>
          <Link className="nav-link" to="register">
            Register
          </Link>{" "}
          <Link className="nav-link" to="login">
            Log In
          </Link>
        </NavBar>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
