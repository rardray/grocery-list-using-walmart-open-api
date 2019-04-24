import React, { useEffect } from "react";
import Items from "./Items";

const Favorites = props => {
  const sTitle = "Favorites";
  const favorites = props.history.filter(el => {
    return el.favorite;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="list-items">
      <h2>{sTitle}</h2>
      {favorites.length ? (
        <p>{favorites.length} Favorite Items</p>
      ) : (
        <h4>No Favorite Items.</h4>
      )}
      {favorites.map((el, i) => {
        return (
          <div key={el.id} className="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, i, el)}
              title={el.title}
              action={props.addToList.bind(this, i, el)}
              bLabel="ADD TO CART"
              handleQuantity={props.handleQuantity.bind(this, el, "history")}
              count={el.count}
              favorite={el.favorite}
              addFavorite={props.addFavoriteFromSearch.bind(this, i, el)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
