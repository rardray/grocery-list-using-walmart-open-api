import React from "react";
import Register from "./Register";
import cookie from "react-cookies";
import List from "./List";
import NavBar from "./NavBar";
var Themes = require("./Styles/Themes");

class Home extends React.Component {
  state = {
    user: cookie.load("user") || null
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar />
        {user ? <Register /> : <Register />}
      </div>
    );
  }
}

export default Home;
