import React, { useEffect, useContext } from "react";
import Items from "./Items";
import {
  clearList,
  handleDelete,
  addFavoriteFromSearch,
  handleQuantity,
  updateCartCount
} from "./listActions";
import ListWrapper from "./ListWrapper";
import CartContext from "../contextComponents/cart.context";
import HistoryContext from "../contextComponents/history.context";

const Cart = props => {
  const sTitle = "Grocery List";
  const { updateCart, cart, deleteOne, clearAll } = useContext(CartContext);
  const { getList } = useContext(HistoryContext);

  const total = cart.reduce(function(acc, curr) {
    return acc + curr.count;
  }, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ListWrapper
      header={sTitle}
      subheader={
        cart.length ? `Shwoing ${total} items on grocery list` : "List is empty"
      }
    >
      {cart.map((el, i) => {
        return (
          <Items
            key={el._id}
            id={el._id}
            image={el.historyId.image}
            title={el.historyId.title}
            action={() => setTimeout(() => handleDelete(i, el, deleteOne), 300)}
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              updateCartCount,
              cart,
              updateCart
            )}
            bLabel="Remove"
            del={true}
            count={el.count}
            favorite={el.historyId.favorite}
            addFavorite={() => addFavoriteFromSearch(i, el.historyId, getList)}
          />
        );
      })}
      <button onClick={() => clearList(clearAll)} className="button-blue-full">
        Clear List
      </button>
    </ListWrapper>
  );
};

export default Cart;
