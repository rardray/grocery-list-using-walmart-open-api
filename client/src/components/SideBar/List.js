import React from "react";
import Heart from "../ListPages/Heart";
import "../Styles/main.css";

const List = props => {
  const {
    history,
    filtervalue,
    sortvalue,
    count,
    buttonLabel,
    grocery
  } = props;
  function comp(a, b) {
    const upA = a[sortvalue];
    const upB = b[sortvalue];
    let compare = 0;
    if (upA > upB) {
      compare = 1;
    } else if (upA < upB) {
      compare = -1;
    }
    return compare * -1;
  }

  const filtered = history.filter((el, i) => {
    return el[filtervalue];
  });
  const sorted = filtered.sort(comp);
  let total = filtered.reduce(function(acc, curr) {
    return acc + curr[count];
  }, 0);
  return (
    <div>
      <p>
        Products: {filtered.length}{" "}
        {count === "count" ? null : "Total Items:" + total}
      </p>
      {sorted.map((el, i) => {
        return (
          <div key={el.id} className="list-block">
            <img src={el.image} alt={el.title} />
            <h5>{el.title}</h5>
            <button
              onClick={
                grocery
                  ? props.handleDelete.bind(this, el)
                  : props.addToList.bind(this, i, el)
              }
            >
              {buttonLabel}
            </button>

            <Heart
              addFavorite={props.addFavorite.bind(this, i, el)}
              favorite={el.favorite}
            />
            <span>Quantity: {el[count]} </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
