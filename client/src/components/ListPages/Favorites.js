import React, { useEffect } from "react";
import Items from "./Items";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "./listActions";

const Favorites = props => {
  const sTitle = "Favorites";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="list-items">
      <h2 className="header-orange">{sTitle}</h2>
      {props.favorites.length ? (
        <p>{props.favorites.length} Favorite Items</p>
      ) : (
        <h4>No Favorite Items.</h4>
      )}
      {props.favorites.map((el, i) => {
        return (
          <Items
            key={el._id}
            id={el._id}
            image={el.image}
            title={el.title}
            action={() => addToList(i, el, props.user, props.getCart)}
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              props.addFavCount,
              props.favorites,
              null
            )}
            fav={true}
            bLabel="Add to List"
            count={el.count}
            favorite={el.favorite}
            addFavorite={() =>
              setTimeout(
                () => addFavoriteFromSearch(i, el, props.user, props.getList),
                300
              )
            }
          />
        );
      })}
    </div>
  );
};

export default Favorites;
