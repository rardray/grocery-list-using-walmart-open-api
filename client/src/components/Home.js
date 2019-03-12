import React from "react";
import NavBar from "./NavBar";
import { Link } from "@reach/router";
import "./Styles/main.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar>
          <Link className="nav-link" to="history">
            History
          </Link>
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
        {this.props.ListBar}
        {this.props.children}
      </div>
    );
  }
}

export default Home;
