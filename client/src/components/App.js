import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import $ from "jquery";
import HistoryProvider from "./contextComponents/HistoryProvider";
import CartProvider from "./contextComponents/CartProvider";
import FavoritesProvider from "./contextComponents/FavoritesProvider";
import ProductSearchProvider from "./contextComponents/ProductSearchProvider";
import Routes from "./Routes";
import "./Styles/lists.css";

const App = function() {
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
  return (
    <div className="App">
      <FavoritesProvider>
        <CartProvider>
          <HistoryProvider>
            <ProductSearchProvider>
              <Routes {...{ setUser, logOutUser, device, user }} />
            </ProductSearchProvider>
          </HistoryProvider>
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};

export default App;
