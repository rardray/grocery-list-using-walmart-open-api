import React, { useEffect } from "react";
import Items from "./Items";
import { apiToken, editListUrl } from "../Utility/appHelpers";
import { putRequest } from "../Utility/httpRequests";

const Cart = props => {
  const handleUpdate = (data, e) => {
    if (e.target.name === "plus") {
      data.cartCount += 1;
    }
    if (e.target.name === "minus") {
      if (data.cartCount === 1) {
        return;
      }
      data.cartCount -= 1;
    }
    putRequest(editListUrl, apiToken(), data, props.getList);
  };
  const sTitle = "Grocery List";
  function comp(a, b) {
    const upA = a.addedOn;
    const upB = b.addedOn;
    let compare = 0;
    if (upA > upB) {
      compare = 1;
    } else if (upA < upB) {
      compare = -1;
    }
    return compare * -1;
  }
  const cart = props.history
    .filter(el => {
      return el.inCart;
    })
    .sort(comp);
  const total = cart.reduce(function(acc, curr) {
    return acc + curr.cartCount;
  }, 0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="list-items">
      <h2>{sTitle}</h2>
      {cart.length ? (
        <p>Showing {total} items in grocery list</p>
      ) : (
        <h4>Shopping Cart Empty.</h4>
      )}
      {cart.map((el, i) => {
        return (
          <div key={el.id} className="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, i, el)}
              title={el.title}
              action={props.handleDelete.bind(this, el)}
              bLabel="REMOVE"
              handleQuantity={handleUpdate.bind(this, el)}
              count={el.cartCount}
              favorite={el.favorite}
              addFavorite={props.addFavoriteFromSearch.bind(this, i, el)}
            />
          </div>
        );
      })}
      <button onClick={props.clearList}>Clear List</button>
    </div>
  );
};

export default Cart;
