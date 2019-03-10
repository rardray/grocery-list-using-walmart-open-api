import React from "react";
import cookie from "react-cookies";
import List from "./List";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "./Styles/main.css";
import axios from "axios";
var formlogic = require("./formlogic");
var Themes = require("./Styles/Themes");

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar>
          <Link className="nav-link" to="/">
            {this.props.user.firstName || "Home"}
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
          {this.props.Searchbar}
        </NavBar>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
