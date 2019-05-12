import React, { useState } from "react";
import FavoritesContext from "./favorites.context";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import cookie from "react-cookies";

const FavoritesProvider = ({ children }) => {
  const getFavorites = () => {
    let user = cookie.load("user");
    getRequest(
      "/api/list/favorites/" + user._id,
      apiToken(),
      data =>
        setFavorites(prevFavorites => {
          return { ...prevFavorites, favorites: [...data.data] };
        }),
      () => {}
    );
  };
  const addFavCount = data =>
    setFavorites(prevFavorites => {
      return { ...prevFavorites, favorites: [...data] };
    });

  const faveDef = {
    favorites: [],
    addFavCount,
    getFavorites
  };
  const [favorites, setFavorites] = useState(faveDef);
  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
