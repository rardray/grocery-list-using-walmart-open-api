import React from "react";
import Heart from "./Heart";

const Items = props => {
  return (
    <div
      key={props.id}
      id={props.id}
      className="r-contain list-block"
      style={{ marginTop: 0, marginBottom: 10 }}
    >
      <div style={{ display: "block", marginBottom: 34, minHeight: 65 }}>
        <img
          src={props.image}
          alt="missing"
          draggable={true}
          onDragStart={props.handleDrag}
        />
        <h4>{props.title}</h4>
      </div>
      <div
        style={{
          display: "block",
          position: "absolute",
          bottom: 6,
          right: 0,
          width: "100%",
          textAlign: "right",
          boxSizing: "border-box",
          borderTop: "1px solid #0c3450",
          background: "white"
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            verticalAlign: "middle"
          }}
        >
          <button style={{ marginRight: 15 }} onClick={props.action}>
            {props.bLabel}
          </button>
          <span>Quantity:</span>
          <button name="minus" className="minus" onClick={props.handleQuantity}>
            -
          </button>
          <span className="quantity"> {props.count} </span>
          <button name="plus" className="minus" onClick={props.handleQuantity}>
            +
          </button>
          <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
        </div>
      </div>
    </div>
  );
};

export default Items;
