import React from "react";

export default function BoxContainer(props) {
  const { additionalStyles } = props;
  return (
    <div style={additionalStyles}>
      <div
        className={props.class}
        style={{
          display: "block",
          position: "relative",
          boxSizing: "border-box",
          width: "100%",
          background: "white",
          margin: "0px 0 25px 0",
          padding: 10,
          textAlign: "center",
          boxShadow: "0px 2px 4px #0c3450"
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
