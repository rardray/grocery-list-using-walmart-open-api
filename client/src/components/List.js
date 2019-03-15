import React from "react";

const List = props => {
  function comp(a, b) {
    const upA = a.updatedAt;
    const upB = b.updatedAt;
    let compare = 0;
    if (upA > upB) {
      compare = 1;
    } else if (upA < upB) {
      compare = -1;
    }
    return compare * -1;
  }
  const { history } = props;
  const filtered = history.filter((el, i) => {
    return el.inCart;
  });
  const sorted = filtered.sort(comp);
  let total = 0;
  for (let i = 0; i < filtered.length; i++) {
    total += filtered[i].cartCount;
  }
  return (
    <div>
      <p>
        Products: {filtered.length} Total Items: {total}
      </p>
      {sorted.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <img src={el.image} />
            <h4>{el.title}</h4>
            <button onClick={props.handleDelete.bind(this, el)}>REMOVE</button>
            <span>Quantity: {el.cartCount} </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
