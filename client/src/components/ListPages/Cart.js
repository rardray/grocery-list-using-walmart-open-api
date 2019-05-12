import React, { useEffect } from "react";
import Items from "./Items";
import {
  clearList,
  handleDelete,
  addFavoriteFromSearch,
  handleQuantity,
  updateCartCount
} from "./listActions";

const Cart = props => {
  const sTitle = "Grocery List";

  const total = props.cart.reduce(function(acc, curr) {
    return acc + curr.count;
  }, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="list-items">
      <h2 className="header-orange">{sTitle}</h2>
      {props.cart.length ? (
        <p>Showing {total} items in grocery list</p>
      ) : (
        <h4>Shopping Cart Empty.</h4>
      )}
      {props.cart.map((el, i) => {
        return (
          <Items
            key={el._id}
            id={el._id}
            image={el.historyId.image}
            title={el.historyId.title}
            action={() =>
              setTimeout(() => handleDelete(i, el, props.deleteOne), 300)
            }
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              updateCartCount,
              props.cart,
              props.updateCart
            )}
            bLabel="Remove"
            del={true}
            count={el.count}
            favorite={el.historyId.favorite}
            addFavorite={() =>
              addFavoriteFromSearch(i, el.historyId, props.user, props.getList)
            }
          />
        );
      })}
      <button
        onClick={() => clearList(props.user, props.clearAll)}
        className="button-blue-full"
      >
        Clear List
      </button>
    </div>
  );
};

export default Cart;
