import React, { useEffect, useContext } from "react";
import Items from "./Items";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "./listActions";
import ListWrapper from "./ListWrapper";
import ProductSearchContext from "../contextComponents/productSearch.context";
import HistoryContext from "../contextComponents/history.context";

const Search = props => {
  const { productSearch, addSearch, setSearch } = useContext(
    ProductSearchContext
  );
  const { getList } = useContext(HistoryContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});
  const sTitle = window.location.pathname.slice(16).replace("%20", " ");
  return (
    <ListWrapper
      header={"Search results for " + sTitle}
      subheader={
        productSearch.length
          ? null
          : "Sorry, search returned no results.  Try broadening your search query"
      }
    >
      {productSearch.map((el, i) => {
        return (
          <Items
            key={el.id}
            id={el.id}
            image={el.image}
            title={el.title}
            action={() => addToList(i, el, getList)}
            bLabel="Add to List"
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              addSearch,
              productSearch,
              null
            )}
            count={el.count}
            favorite={el.favorite}
            addFavorite={() => addFavoriteFromSearch(i, el, setSearch)}
          />
        );
      })}
    </ListWrapper>
  );
};

export default Search;
