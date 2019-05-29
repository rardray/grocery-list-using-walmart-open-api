import React from "react";

export default function Button(props) {
  return (
    <button
      className={props.class}
      onClick={props.click}
      style={{
        background: "#377fbb",
        color: "white"
      }}
    >
      {props.label}
    </button>
  );
}
