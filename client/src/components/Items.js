import React from "react";
import favorite from "./Styles/favourite.svg";

const Items = props => {
  return (
    <div key={props.id}>
      <img
        src={props.image}
        alt="missing"
        draggable={true}
        onDragStart={props.handleDrag}
      />
      <h4>{props.title}</h4>
      <button onClick={props.addToList}>ADD TO LIST</button>
      <span>Quantity:</span>
      <button name="minus" id="minus" onClick={props.handleQuantity}>
        -
      </button>
      <span id="quantity"> {props.count} </span>
      <button name="plus" id="minus" onClick={props.handleQuantity}>
        +
      </button>
      <img src={favorite} id="favorite" />
    </div>
  );
};

export default Items;
