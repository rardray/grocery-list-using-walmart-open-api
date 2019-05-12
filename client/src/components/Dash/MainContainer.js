import React from "react";

export default function MainContainer(props) {
  return (
    <div
      style={{
        background: "#dceaf5",
        margin: "auto",
        display: "inline-block",
        position: "relative",
        minWidth: "90%",
        width: props.device ? "100%" : "90%",
        textAlign: "center"
      }}
    >
      {props.children}
    </div>
  );
}
