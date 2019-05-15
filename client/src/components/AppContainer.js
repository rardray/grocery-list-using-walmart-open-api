import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import Routes from "./Routes";
import $ from "jquery";

export default function AppContainer(props) {
  const [user, setUse] = useState(cookie.load("user") || "");
  const [device, setWindow] = useState(false);

  const setUser = data => setUse(() => cookie.load("user"));

  const logOutUser = () => {
    setUse(() => "");
  };
  useEffect(() => {
    function handleSideBar() {
      if ($(window).height() > $(window).width()) {
        setWindow(true);
      } else {
        setWindow(false);
      }
    }
    handleSideBar();
    window.addEventListener("deviceorientation", handleSideBar);
    return function() {
      window.removeEventListener("deviceorientation", handleSideBar);
    };
  });

  return <Routes {...{ setUser, logOutUser, device, user }} />;
}
