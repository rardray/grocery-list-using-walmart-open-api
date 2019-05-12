import React from "react";

export default function IngredientsList(props) {
  return (
    <div
      className="list-block"
      style={{
        margin: 4,
        padding: 10,
        fontSize: "0.75em",
        position: "relative",
        overflow: "visible",
        maxHeight: 80,
        minHeight: 60
      }}
    >
      <img
        style={{
          height: 40,
          width: 40,
          margin: 0,
          boxSizing: "border-box",
          left: 0,
          top: 0
        }}
        src={props.image}
        alt={props.title}
      />
      <div style={{ display: "inline-block", position: "absolute", right: 10 }}>
        <h4 style={{ margin: 0, marginLeft: 30 }}>{props.title}</h4>
        <p style={{ float: "right" }}>{props.measure}</p>
      </div>
    </div>
  );
}
