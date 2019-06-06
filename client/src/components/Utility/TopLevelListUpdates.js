import React, { useEffect, useContext } from "react";
import HistoryContext from "../contextComponents/history.context";
import CartContext from "../contextComponents/cart.context";
import FavoritesContext from "../contextComponents/favorites.context";
import ThemeContext from "../contextComponents/themes.context";

export default function(props) {
  const { getFavorites } = useContext(FavoritesContext);
  const { getCart } = useContext(CartContext);
  const { history, getList, clearHistory } = useContext(HistoryContext);
  const { changeTheme } = useContext(ThemeContext);
  const { user } = props;

  useEffect(() => {
    if (history.length) {
      getFavorites();
    }
  }, [history]);

  useEffect(() => {
    getList();
    return function cleanup() {
      clearHistory();
    };
  }, []);
  useEffect(() => {
    if (history.length) {
      getCart();
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      changeTheme(user.theme);
    }
  }, []);
  return <>{props.children}</>;
}
