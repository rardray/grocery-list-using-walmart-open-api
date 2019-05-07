import React, { useEffect, useState } from "react";
import Items from "./Items";
import $ from "jquery";
import Loader from "../Loader";

const History = props => {
  const [load, setLoad] = useState(0);
  const {
    handleDrag,
    history,
    addToList,
    handleQuantity,
    addFavoriteFromSearch
  } = props;
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
    <div className="list-items">
      <h2 className="header-orange">History</h2>
      <p>showing last {props.history.length} items in search history</p>
      {history.map((el, i) => {
        if (i >= load + 20) {
          return null;
        }
        return (
          <Items
            key={el.id}
            id={el.id}
            image={el.image}
            handleDrag={handleDrag.bind(this, i, el)}
            title={el.title}
            action={addToList.bind(this, i, el)}
            bLabel="Add to List"
            handleQuantity={handleQuantity.bind(this, el, "history")}
            count={el.count}
            addFavorite={addFavoriteFromSearch.bind(this, i, el)}
            favorite={el.favorite}
          />
        );
      })}
    </div>
  );
};

export default History;
