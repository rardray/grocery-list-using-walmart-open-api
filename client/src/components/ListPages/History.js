import React, { useEffect, useState, useContext } from "react";
import Items from "./SharedStateless/Items";
import $ from "jquery";
import {
  addToList,
  addFavoriteFromSearch,
  handleQuantity
} from "../Utility/listActions";
import ListWrapper from "./SharedStateless/ListWrapper";
import HistoryContext from "../contextComponents/history.context";
import CartContext from "../contextComponents/cart.context";

const History = props => {
  const [load, setLoad] = useState(0);
  const { history, addHistCount, setHist } = useContext(HistoryContext);
  const { getCart } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});
  function handleScroll() {
    let doc = $(document).height();
    let scroll = window.scrollY;
    if (doc - scroll < $(window).height() + 100) {
      setLoad(prevLoad => prevLoad + 20);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, {});

  return (
    <ListWrapper
      header={"History"}
      subheader={`showing last ${history.length} items in search history`}
    >
      {history.map((el, i) => {
        if (i >= load + 20) {
          return null;
        }
        return (
          <Items
            key={el._id}
            id={el._id}
            image={el.image}
            title={el.title}
            action={() =>
              addToList(i, { ...el, userId: props.user._id }, getCart)
            }
            handleQuantity={handleQuantity.bind(
              this,
              i,
              el.count,
              addHistCount,
              history,
              null
            )}
            bLabel="Add to List"
            count={el.count}
            addFavorite={() =>
              addFavoriteFromSearch(
                i,
                { ...el, userId: props.user._id },
                setHist
              )
            }
            favorite={el.favorite}
          />
        );
      })}
    </ListWrapper>
  );
};

export default History;
