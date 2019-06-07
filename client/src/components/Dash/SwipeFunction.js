import React, { useState, useEffect } from "react";
import $ from "jquery";
import { navigate } from "@reach/router";
import { paths } from "../Utility/appHelpers";

const tf = [
  `translateX(0px)`,
  `translateX(${$(window).width()}px)`,
  `translateX(-${$(window).width()}px)`
];
const ts = [`transform  ease-out 0.4s`, `transform 0.0s`];

export default function SwipeFunction(props) {
  const [transition, setTransition] = useState({
    transform: tf[0],
    transition: ts[0]
  });
  useEffect(() => {
    $(window).width();
  }, [props.window]);

  let xPos = null;

  const touchLimit = () => {
    window.removeEventListener("touchend", swipeEnd);
  };
  const swipeStart = function(e) {
    let clientX = e.touches[0].clientX;
    if (e.touches.length > 1) {
      return;
    }
    xPos = clientX;
    window.addEventListener("touchend", swipeEnd);
    setTimeout(touchLimit, 500);
  };

  const transAn = () => {
    let pathname = window.location.pathname;
    if (pathname === paths[4]) {
      navigate(paths[0]);
    } else {
      let navi = paths.indexOf(pathname);
      navigate(paths[navi + 1]);
    }
  };
  const transAnB = () => {
    let pathname = window.location.pathname;
    if (paths.indexOf(pathname) === -1) {
      if (pathname.includes("/recipe")) {
        navigate("/");
      } else {
        window.history.back();
      }
    } else if (pathname === paths[0]) {
      navigate(paths[4]);
    } else {
      let navi = paths.indexOf(pathname);
      navigate(paths[navi - 1]);
    }
  };
  const swipeEnd = e => {
    var deltaX = e.changedTouches[0].clientX;
    if (deltaX - xPos < -150) {
      let pathname = window.location.pathname;
      if (paths.indexOf(pathname) === -1) {
        return;
      }
      setTransition({ transform: tf[2], transition: ts[0] });
      setTimeout(transAn, 200);
    }
    if (deltaX - xPos > 150) {
      setTransition({ transform: tf[1], transition: ts[0] });
      setTimeout(transAnB, 200);
    }
  };
  useEffect(() => {
    window.addEventListener("touchstart", swipeStart);
    return function cleanup() {
      window.removeEventListener("touchstart", swipeStart);
    };
  }, {});

  return <div style={transition}>{props.children}</div>;
}
