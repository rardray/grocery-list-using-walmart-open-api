import React, { useState, useEffect, useContext } from "react";
import cookie from "react-cookies";
import Routes from "./Routes";
import $ from "jquery";
import HistoryContext from "./contextComponents/history.context";
import CartContext from "./contextComponents/cart.context";
import FavoritesContext from "./contextComponents/favorites.context";

export default function AppContainer(props) {
  const [user, setUse] = useState(cookie.load("user") || "");

  const [device, setWindow] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const { getFavorites } = useContext(FavoritesContext);
  const { cart, getCart } = useContext(CartContext);
  const { history, getList } = useContext(HistoryContext);

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

  useEffect(() => {
    if (user && history.length) {
      getFavorites();
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      getList();
    }
  }, [user]);

  useEffect(() => {
    if (user && history.length) {
      getCart();
    }
  }, [history]);

  const setProductSearches = data => {
    let list = data.data.products;
    list.forEach(el => {
      el.count = 1;
      el.searchId = el.id;
      el.favorite = false;
      for (let i = 0; i < history.length; i++) {
        if (el.id === history[i].searchId && history[i].favorite) {
          return (el.favorite = true);
        }
      }
    });
    setProductSearch(list);
  };

  const setSearch = (data, i) => {
    let list = productSearch;
    list[i].favorite = data.data.favorite;
    setProductSearch(prevProductSearch => {
      return [...list];
    });
    getList();
  };

  return (
    <Routes
      addSearch={data =>
        setProductSearch(() => {
          return [...data];
        })
      }
      {...{
        setProductSearches,
        setSearch,
        setUser,
        logOutUser,
        device,
        productSearch,
        user
      }}
    />
  );
}
