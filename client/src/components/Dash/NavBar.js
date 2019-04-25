import React from "react";

var Themes = require("../Styles/Themes");

const NavBar = props => {
  return (
    <Themes.Nav>
      <div className="nav-contain">{props.children}</div>
      {props.NavList}
    </Themes.Nav>
  );
};

export default NavBar;
