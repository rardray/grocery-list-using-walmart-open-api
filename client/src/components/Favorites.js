import React from "react";
import Items from "./Items";
import "./Styles/main.css";

const Favorites = props => {
  const sTitle = "Favorites";
  const favorites = props.history.filter(el => {
    return el.favorite;
  });
  return (
    <div className="list-items">
      <h2>{sTitle}</h2>
      {favorites.length ? null : <h4>No Favorite Items.</h4>}
      {favorites.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, i, el)}
              title={el.title}
              addToList={props.addToList.bind(this, i, el)}
              handleQuantity={props.handleQuantity.bind(this, i, "history")}
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
