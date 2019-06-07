import React, { useEffect, useContext } from "react";
import Items from "./SharedStateless/Items";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "../Utility/listActions";
import ListWrapper from "./SharedStateless/ListWrapper";
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
            action={() =>
              addToList(i, { ...el, userId: props.user._id }, getList)
            }
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
            addFavorite={() =>
              addFavoriteFromSearch(
                i,
                { ...el, userId: props.user._id },
                setSearch
              )
            }
          />
        );
      })}
    </ListWrapper>
  );
};

export default Search;
