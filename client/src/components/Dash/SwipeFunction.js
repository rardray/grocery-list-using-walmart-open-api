import React, { useState, useEffect } from "react";
import $ from "jquery";

const tf = [
  `translateX(0px)`,
  `translateX(${$(window).width()}px)`,
  `translateX(-${$(window).width()}px)`
];
const ts = [`transform  ease-out 0.2s`, `transform 0.0s`];

export default function SwipeFunction(props) {
  const [xPosition, setxPosition] = useState(null);
  const [transition, setTransition] = useState({
    transform: tf[0],
    transition: ts[0]
  });
  useEffect(() => {
    window.addEventListener("touchstart", swipeStart);
    return function cleanup() {
      window.removeEventListener("touchstart", swipeStart);
    };
  }, {});

  const touchLimit = () => {
    window.removeEventListener("touchend", swipeEnd);
  };
  const swipeStart = e => {
    var clientX = e.touches[0].clientX;
    setxPosition(clientX);
    window.addEventListener("touchend", swipeEnd);
    setTimeout(touchLimit, 1000);
  };
  const finishAn = () => {
    setTransition({ transform: tf[0], transition: ts[0] });
  };
  const transAn = () => {
    setTimeout(finishAn, 200);
    window.history.forward();
    setTransition({ transform: tf[1], transition: ts[1] });
  };
  const transAnB = () => {
    setTimeout(finishAn, 200);
    window.history.back();
    setTransition({ transform: tf[2], transition: ts[1] });
  };
  const swipeEnd = e => {
    var deltaX = e.changedTouches[0].clientX;
    if (deltaX - xPosition < -100) {
      setTransition({ transform: tf[2], transition: ts[0] });
      setTimeout(transAn, 200);
    }
    if (deltaX - xPosition > 100) {
      setTransition({ transform: tf[1], transition: ts[0] });
      setTimeout(transAnB, 200);
    }
  };
  return <div style={transition}>{props.children}</div>;
}
