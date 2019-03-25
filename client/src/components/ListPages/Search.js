import React from "react";
import Items from "./Items";

const Search = props => {
  const sTitle = window.location.pathname.slice(16).replace("%20", " ");
  return (
    <div className="list-items">
      <h2>Search Results for {sTitle}</h2>
      {props.productSearch.length ? null : (
        <h4>
          Sorry, search returned no results. Try broadening your search query.
        </h4>
      )}
      {props.productSearch.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, i, el)}
              title={el.title}
              action={props.addToList.bind(this, i, el)}
              bLabel="ADD TO CART"
              handleQuantity={props.handleQuantity.bind(
                this,
                el,
                "productSearch"
              )}
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

export default Search;
