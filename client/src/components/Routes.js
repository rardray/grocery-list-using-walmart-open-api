import React from "react";
import Home from "./Home";
import List from "./List";
import Register from "./Register";
import { Router } from "@reach/router";
import Login from "./Login";

const Routes = props => {
  return (
    <Router>
      <Home path="/">
        <Register path="register" />
        <Login path="login" />
      </Home>
    </Router>
  );
};

export default Routes;
