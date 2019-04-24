import React, { useEffect } from "react";
import Items from "./Items";

const History = props => {
  const {
    handleDrag,
    history,
    addToList,
    handleQuantity,
    addFavoriteFromSearch
  } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="list-items">
      <h2>History</h2>
      <p>showing last {props.history.length} items in search history</p>
      {history.map((el, i) => {
        return (
          <div key={el.id} className="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={handleDrag.bind(this, i, el)}
              title={el.title}
              action={addToList.bind(this, i, el)}
              bLabel="ADD TO CART"
              handleQuantity={handleQuantity.bind(this, el, "history")}
              count={el.count}
              addFavorite={addFavoriteFromSearch.bind(this, i, el)}
              favorite={el.favorite}
            />
          </div>
        );
      })}
    </div>
  );
};

export default History;
