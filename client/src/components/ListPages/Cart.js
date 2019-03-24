import React from "react";
import Items from "./Items";

const Cart = props => {
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
  return (
    <div className="list-items">
      <h2>{sTitle}</h2>
      {cart.length ? (
        <p>Showing {cart.length} items in grocery list</p>
      ) : (
        <h4>No Favorite Items.</h4>
      )}
      {cart.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, i, el)}
              title={el.title}
              action={props.handleDelete.bind(this, i, el)}
              bLabel="REMOVE"
              handleQuantity={props.handleQuantity.bind(this, i, "history")}
              count={el.cartCount}
              favorite={el.favorite}
              addFavorite={props.addFavoriteFromSearch.bind(this, i, el)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
