import React from "react";

export default function IngredientsList(props) {
  return (
    <div
      className="list-block"
      style={{ margin: 0, padding: 0, fontSize: "0.75em" }}
    >
      <img
        style={{ height: 25, width: 25, margin: 10 }}
        src={props.image}
        alt={props.title}
      />
      <h4 style={{ margin: 0, marginLeft: 30 }}>{props.title}</h4>
      <p>{props.measure}</p>
    </div>
  );
}
