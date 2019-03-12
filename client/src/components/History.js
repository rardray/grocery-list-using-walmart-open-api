import React from "react";
import Items from "./Items";

const History = props => {
  return (
    <div className="list-items">
      <h2>History</h2>
      <p>showing last {props.history.length} items in search history</p>
      {props.history.map((e, i) => {
        return (
          <div key={e.id} id="list-block">
            <Items
              id={e.id}
              image={e.image}
              handleDrag={props.handleDrag.bind(this, i, "history")}
              title={e.title}
              addToList={props.addToList.bind(this, i, "history")}
              handleQuantity={props.handleQuantity.bind(this, i)}
              count={e.count}
            />
          </div>
        );
      })}
    </div>
  );
};

export default History;
