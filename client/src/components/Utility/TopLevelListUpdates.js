import React, { useEffect, useContext } from "react";
import HistoryContext from "../contextComponents/history.context";
import CartContext from "../contextComponents/cart.context";
import FavoritesContext from "../contextComponents/favorites.context";

export default function(props) {
  const { getFavorites } = useContext(FavoritesContext);
  const { getCart } = useContext(CartContext);
  const { history, getList } = useContext(HistoryContext);
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
  return <>{props.children}</>;
}
