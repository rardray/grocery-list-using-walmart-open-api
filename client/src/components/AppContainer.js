import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import cookie from "react-cookies";
import Routes from "./Routes";
import $ from "jquery";
import { apiKeyGr, apiToken, searchURL } from "./Utility/appHelpers";
import { getRequest } from "./Utility/httpRequests";

export default function AppContainer(props) {
  const [user, setUse] = useState(cookie.load("user") || "");
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [device, setWindow] = useState(false);
  const [productSearch, setProductSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const setUser = data => setUse(() => cookie.load("user"));
  const handleChange = e => {
    setQuery(e.target.value);
  };
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
  const getList = () => {
    getRequest("/api/list/" + user._id, apiToken(), data =>
      setHistory(data.data)
    );
  };
  const getCart = () => {
    getRequest("/api/cart/" + user._id, apiToken(), data => setCart(data.data));
  };
  const getFavorites = () => {
    getRequest("/api/list/favorites/" + user._id, apiToken(), data =>
      setFavorites(data.data)
    );
  };
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

  const clearAll = () => setCart(() => []);
  const deleteOne = (data, i) => {
    let obj = cart.filter(el => {
      return el !== cart[i];
    });
    setCart(() => obj);
  };
  const setHist = (data, i) => {
    let list = history;
    list[i].favorite = data.data.favorite;
    setHistory(prevHistory => {
      return [...list];
    });
  };
  const setSearch = (data, i) => {
    let list = productSearch;
    list[i].favorite = data.data.favorite;
    setProductSearch(prevProductSearch => {
      return [...list];
    });
    getList();
  };
  const updateCart = (data, i) => {
    let obj = cart;
    cart[i] = data.data;
    setCart(() => {
      return [...obj];
    });
  };
  return (
    <Routes
      addCount={data =>
        setHistory(() => {
          return [...data];
        })
      }
      addSearch={data =>
        setProductSearch(() => {
          return [...data];
        })
      }
      addFavCount={data =>
        setFavorites(() => {
          return [...data];
        })
      }
      {...{
        setProductSearches,
        favorites,
        updateCart,
        setSearch,
        getCart,
        setHist,
        getList,
        setUser,
        logOutUser,
        history,
        cart,
        device,
        productSearch,
        query,
        user,
        handleChange,
        clearAll,
        deleteOne
      }}
    />
  );
}
