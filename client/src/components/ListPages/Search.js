import React, { useEffect } from "react";
import Items from "./Items";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "./listActions";

const Search = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});
  const sTitle = window.location.pathname.slice(16).replace("%20", " ");
  return (
    <div className="list-items">
      <h2 className="header-orange">Search Results for {sTitle}</h2>
      {props.productSearch.length ? null : (
        <h4>
          Sorry, search returned no results. Try broadening your search query.
        </h4>
      )}
      {props.productSearch.map((el, i) => {
        return (
          <Items
            key={el.id}
            id={el.id}
            image={el.image}
            title={el.title}
            action={() => addToList(i, el, props.getList)}
            bLabel="Add to List"
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              props.addSearch,
              props.productSearch,
              null
            )}
            count={el.count}
            favorite={el.favorite}
            addFavorite={() => addFavoriteFromSearch(i, el, props.setSearch)}
          />
        );
      })}
    </div>
  );
};

export default Search;
