import React from "react";
import Items from "./Items";

const History = props => {
  return (
    <div className="list-items">
      <h2>History</h2>
      <p>showing last {props.history.length} items in search history</p>
      {props.history.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, el, "history")}
              title={el.title}
              addToList={props.addToList.bind(this, el, "history")}
              handleQuantity={props.handleQuantity.bind(this, i, "history")}
              count={el.count}
            />
          </div>
        );
      })}
    </div>
  );
};

export default History;
