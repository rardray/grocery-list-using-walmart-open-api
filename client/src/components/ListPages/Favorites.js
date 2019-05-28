import React, { useEffect, useContext } from "react";
import Items from "./SharedStateless/Items";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "../Utility/listActions";
import ListWrapper from "./SharedStateless/ListWrapper";
import FavoritesContext from "../contextComponents/favorites.context";
import HistoryContext from "../contextComponents/history.context";
import CartContext from "../contextComponents/cart.context";

const Favorites = props => {
  const sTitle = "Favorites";
  const { favorites, addFavCount } = useContext(FavoritesContext);
  const { getList } = useContext(HistoryContext);
  const { getCart } = useContext(CartContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ListWrapper
      header={sTitle}
      subheader={
        favorites.length
          ? `${favorites.length} favorite items`
          : "No favorites yet."
      }
    >
      {favorites.map((el, i) => {
        return (
          <Items
            key={el._id}
            id={el._id}
            image={el.image}
            title={el.title}
            action={() => addToList(i, el, getCart)}
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              addFavCount,
              favorites,
              null
            )}
            fav={true}
            bLabel="Add to List"
            count={el.count}
            favorite={el.favorite}
            addFavorite={() =>
              setTimeout(() => addFavoriteFromSearch(i, el, getList), 300)
            }
          />
        );
      })}
    </ListWrapper>
  );
};

export default Favorites;
