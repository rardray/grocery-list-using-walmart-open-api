import { createContext } from "react";

const FavoritesContext = createContext({
  favorites: [],
  getFavorites: () => {},
  addFavCount: () => {}
});

export default FavoritesContext;
