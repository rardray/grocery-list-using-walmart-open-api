import React from "react";
var Themes = require("./Styles/Themes");

const NavBar = props => {
  return <Themes.Nav>{props.children}</Themes.Nav>;
};

export default NavBar;
