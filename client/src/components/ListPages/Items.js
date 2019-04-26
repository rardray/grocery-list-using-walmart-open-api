import React from "react";
import Heart from "./Heart";

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
      <button onClick={props.action}>{props.bLabel}</button>
      <div style={{ display: "inline-block" }}>
        <span>Quantity:</span>
        <button name="minus" className="minus" onClick={props.handleQuantity}>
          -
        </button>
        <span className="quantity"> {props.count} </span>
        <button name="plus" className="minus" onClick={props.handleQuantity}>
          +
        </button>
      </div>
      <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
    </div>
  );
};

export default Items;
