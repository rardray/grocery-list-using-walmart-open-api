import React, { useEffect, useState } from "react";

var Themes = require("../Styles/Themes");

const NavBar = props => {
  const [scrollPos, setScrollPos] = useState(0);
  const [hide, setHidden] = useState(false);

  const setscroll = () => {
    setScrollPos(window.scrollY);
  };
  const setHide = () => {
    if (window.scrollY > scrollPos + 50) {
      setHidden(true);
    } else if (window.scrollY < scrollPos - 50 || window.scrollY === 0) {
      setHidden(false);
    }
  };
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
  }, [scrollPos]);
  return (
    <Themes.Nav
      style={{
        opacity: hide ? "0" : "1",
        transform: hide ? "translateY(-100px)" : null,
        transition: "0.5s ease-in-out"
      }}
    >
      <div className="nav-contain">{props.children}</div>
      {props.NavList}
    </Themes.Nav>
  );
};

export default NavBar;
