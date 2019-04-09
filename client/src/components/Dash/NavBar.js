import React from "react";
var Themes = require("../Styles/Themes");

const NavBar = props => {
  return (
    <Themes.Nav>
      <div className="nav-contain">{props.children}</div>
    </Themes.Nav>
  );
};

export default NavBar;
