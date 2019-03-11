import React from "react";

const List = props => {
  const { groceryList } = props;
  return (
    <div>
      {groceryList.map((e, i) => {
        return (
          <div key={e.id} id="list-block">
            <img src={e.image} />
            <h4>{e.title}</h4>
            <button>REMOVE</button>
            <span>Quantity: {e.count} </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
