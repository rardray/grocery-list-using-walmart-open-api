import React from "react";

const List = props => {
  const { groceryList } = props;
  const reducer = (acc, cur) => acc + cur;
  let total = 0;
  for (let i = 0; i < groceryList.length; i++) {
    total += groceryList[i].count;
  }

  return (
    <div>
      <p>
        Products: {props.groceryList.length} Total Items: {total}
      </p>
      {groceryList.map((e, i) => {
        return (
          <div key={e.id} id="list-block">
            <img src={e.image} />
            <h4>{e.title}</h4>
            <button onClick={props.handleDelete.bind(this, e.id)}>
              REMOVE
            </button>
            <span>Quantity: {e.count} </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
