import React from "react";

export default function MainContainer(props) {
  return (
    <div
      style={{
        background: "white",
        margin: "auto",
        display: "inline-block",
        position: "relative",
        minWidth: "90%",
        maxWidth: props.window ? "100%" : "90%",
        textAlign: "center"
      }}
    >
      {props.children}
    </div>
  );
}
