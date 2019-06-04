import React, { useEffect, useContext } from "react";
import HistoryContext from "../contextComponents/history.context";
import CartContext from "../contextComponents/cart.context";
import FavoritesContext from "../contextComponents/favorites.context";
import ThemeContext from "../contextComponents/themes.context";

export default function(props) {
  const { getFavorites } = useContext(FavoritesContext);
  const { getCart } = useContext(CartContext);
  const { history, getList } = useContext(HistoryContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { user } = props;

  useEffect(() => {
    if (history.length) {
      getFavorites();
    }
  }, [history]);

  useEffect(() => {
    if (!history.length) {
      getList();
    }
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
