import React, { useContext } from "react";
import {
  addToList,
  addFavoriteFromSearch,
  handleDelete
} from "../Utility/listActions";
import CartContext from "../contextComponents/cart.context";
import HistoryContext from "../contextComponents/history.context";
import FavoritesContext from "../contextComponents/favorites.context";
import "../Styles/main.css";
import Lists from "./Lists";
import P from "../ThemedTags/P";

const List = props => {
  const { grocery } = props;
  const { deleteOne, getCart, cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { getList } = useContext(HistoryContext);
  let total = (grocery ? cart : favorites).reduce(function(acc, curr) {
    return acc + curr.count;
  }, 0);
  return (
    <div>
      <P>
        Products: {(grocery ? cart : favorites).length} {"Total Items:" + total}
      </P>
      {grocery
        ? cart.map((el, i) => {
            return (
              <Lists
                key={el.historyId._id}
                image={el.historyId.image}
                title={el.historyId.title}
                favorite={el.historyId.favorite}
                count={el.count}
                action={() => handleDelete(i, el, deleteOne)}
                buttonLabel="Remove"
                addFavorite={() =>
                  addFavoriteFromSearch(i, el.historyId, getList)
                }
              />
            );
          })
        : favorites.map((el, i) => {
            return (
              <Lists
                key={el._id}
                image={el.image}
                title={el.title}
                favorite={el.favorite}
                count={el.count}
                action={() => addToList(i, el, getCart)}
                buttonLabel="Add to Cart"
                addFavorite={() => addFavoriteFromSearch(i, el, getList)}
              />
            );
          })}
    </div>
  );
};

export default List;
