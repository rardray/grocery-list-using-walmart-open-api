import React from "react";

export default function H2(props) {
  return (
    <h2
      className={props.class}
      style={{
        background: "#dc5c36",
        color: "white",
        margin: "2px 0 8px 0",
        padding: 6,
        width: "100%",
        boxShadow: "0px 2px 4px lightgrey"
      }}
    >
      {props.label}
    </h2>
  );
}
