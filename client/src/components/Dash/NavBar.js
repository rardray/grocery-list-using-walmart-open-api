import React, { useEffect, useState } from "react";

var Themes = require("../Styles/Themes");

const NavBar = props => {
  const [scrollPos, setScrollPos] = useState(0);
  const [hide, setHidden] = useState(false);
  function setscroll() {
    setScrollPos(window.scrollY);
  }
  function setHide() {
    if (window.scrollY > scrollPos + 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }
  useEffect(() => {
    window.addEventListener("touchstart", setscroll);
    return function cleanup() {
      window.removeEventListener("touchstart", setscroll);
    };
  }, {});
  useEffect(() => {
    window.addEventListener("scroll", setHide);
    return function cleanup() {
      window.removeEventListener("scroll", setHide);
    };
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
