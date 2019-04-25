import React, { useState, useEffect } from "react";
import $ from "jquery";
import { navigate } from "@reach/router";
const SB_AD = "/grocery";
const paths = [
  `${SB_AD}/addrecipe`,
  `${SB_AD}/cart`,
  "/",
  `${SB_AD}/favorites`,
  `${SB_AD}/history`
];

const tf = [
  `translateX(0px)`,
  `translateX(${$(window).width()}px)`,
  `translateX(-${$(window).width()}px)`
];
const ts = [`transform  ease-out 0.2s`, `transform 0.0s`];

export default function SwipeFunction(props) {
  const [transition, setTransition] = useState({
    transform: tf[0],
    transition: ts[0]
  });

  useEffect(() => {
    let xPos = null;
    let pathname = window.location.pathname;
    const touchLimit = () => {
      window.removeEventListener("touchend", swipeEnd);
    };
    const swipeStart = function(e) {
      let clientX = e.touches[0].clientX;
      xPos = clientX;
      window.addEventListener("touchend", swipeEnd);
      setTimeout(touchLimit, 1000);
    };
    const finishAn = () => {
      setTransition({ transform: tf[0], transition: ts[0] });
    };
    const transAn = () => {
      setTimeout(finishAn, 200);
      paths.forEach((el, i) => {
        if (i === 4) {
          navigate(paths[0]);
        }
        if (el === pathname) {
          navigate(paths[i + 1]);
        }
      });
      setTransition({ transform: tf[1], transition: ts[1] });
    };
    const transAnB = () => {
      setTimeout(finishAn, 200);
      paths.forEach((el, i) => {
        if (i === 0) {
          navigate(paths[4]);
        }
        if (el === pathname) {
          navigate(paths[i - 1]);
        }
      });
      setTransition({ transform: tf[2], transition: ts[1] });
    };
    const swipeEnd = e => {
      var deltaX = e.changedTouches[0].clientX;
      if (deltaX - xPos < -100) {
        setTransition({ transform: tf[2], transition: ts[0] });
        setTimeout(transAn, 200);
      }
      if (deltaX - xPos > 100) {
        setTransition({ transform: tf[1], transition: ts[0] });
        setTimeout(transAnB, 200);
      }
    };
    window.addEventListener("touchstart", swipeStart);
  }, {});

  return <div style={transition}>{props.children}</div>;
}
