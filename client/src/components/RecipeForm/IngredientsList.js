import React from "react";
import H4 from "../H4";
import P from "../P";

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
        <div style={{ margin: 0, marginLeft: 30 }}>
          <H4 label={props.title} />
        </div>
        <div style={{ float: "right" }}>
          <P>{props.measure}</P>
        </div>
      </div>
    </div>
  );
}
