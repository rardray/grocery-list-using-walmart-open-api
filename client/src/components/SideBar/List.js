import React from "react";
import {
  addToList,
  addFavoriteFromSearch,
  handleDelete
} from "../ListPages/listActions";

import "../Styles/main.css";
import Lists from "./Lists";

const List = props => {
  const { filtervalue, count, grocery } = props;
  let total = props[filtervalue].reduce(function(acc, curr) {
    return acc + curr[count];
  }, 0);
  return (
    <div>
      <p>
        Products: {props[filtervalue].length} {"Total Items:" + total}
      </p>
      {grocery
        ? props.cart.map((el, i) => {
            return (
              <Lists
                key={el.historyId._id}
                image={el.historyId.image}
                title={el.historyId.title}
                favorite={el.historyId.favorite}
                count={el.count}
                action={() => handleDelete(i, el, props.deleteOne)}
                buttonLabel="Remove"
                addFavorite={() =>
                  addFavoriteFromSearch(
                    i,
                    el.historyId,
                    props.user,
                    props.getList
                  )
                }
              />
            );
          })
        : props.favorites.map((el, i) => {
            return (
              <Lists
                key={el._id}
                image={el.image}
                title={el.title}
                favorite={el.favorite}
                count={el.count}
                action={() => addToList(i, el, props.user, props.getCart)}
                buttonLabel="Add to Cart"
                addFavorite={() =>
                  addFavoriteFromSearch(i, el, props.user, props.getList)
                }
              />
            );
          })}
    </div>
  );
};

export default List;
