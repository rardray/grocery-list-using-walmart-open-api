import React from "react";
import Register from "./Register";
import cookie from "react-cookies";
import List from "./List";

class Home extends React.Component {
  state = {
    user: cookie.load("user") || null
  };
  render() {
    const { user } = this.state;
    return <div>{user ? <Register /> : <Register />}</div>;
  }
}

export default Home;
