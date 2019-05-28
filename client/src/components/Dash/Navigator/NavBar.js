import React, { useEffect, useState } from "react";

var Themes = require("../../Styles/Themes");

const NavBar = props => {
  const [scrollPos, setScrollPos] = useState(0);
  const [hide, setHidden] = useState(false);

  useEffect(() => {
    const touchEnd = () => {
      window.addEventListener("touchend", setscroll);
      window.removeEventListener("touchend", setscroll);
    };
    const setscroll = () => {
      let yPos = window.scrollY;
      touchEnd();
      setScrollPos(prevScrollPos =>
        prevScrollPos !== yPos ? yPos : scrollPos
      );
    };
    window.addEventListener("touchstart", setscroll);
    return function cleanup() {
      window.removeEventListener("touchstart", setscroll);
      window.removeEventListener("touchend", setscroll);
    };
  }, []);
  useEffect(() => {
    const setHide = () => {
      let yPos = window.scrollY;
      if (yPos > scrollPos + 50) {
        setHidden(prevHide => true);
      } else if (yPos < scrollPos - 50 || yPos === 0) {
        setHidden(prevHide => false);
      }
    };
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
