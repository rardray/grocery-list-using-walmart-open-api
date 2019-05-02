import React, { useEffect, useState } from "react";

var Themes = require("../Styles/Themes");

const NavBar = props => {
  const [scrollPos, setScrollPos] = useState(0);
  const [hide, setHidden] = useState(false);
  function setscroll() {
    setScrollPos(window.scrollY);
  }
  function setHide() {
    if (window.scrollY - scrollPos > 140) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }
  useEffect(() => {
    window.addEventListener("touchstart", setscroll);
  });
  useEffect(() => {
    window.addEventListener("scroll", setHide);
  });
  return (
    <Themes.Nav
      style={{
        transform: hide ? "translateY(-100px)" : null,
        transition: "transform 0.2s ease-in"
      }}
    >
      <div className="nav-contain">{props.children}</div>
      {props.NavList}
    </Themes.Nav>
  );
};

export default NavBar;
