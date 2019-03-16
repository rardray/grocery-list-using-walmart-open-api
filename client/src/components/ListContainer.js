import React from "react";
import "./Styles/main.css";
import Button from "./Styles/Button";
const ListContainer = props => {
  return (
    <div
      style={{ transform: `translateY(${props.positionY}px)` }}
      onDragOver={props.onDragOver}
      onDrop={props.handleDrop}
    >
      {props.children}
      <Button label="C L E A R  L I S T" click={props.clearList} />
      <div
        style={{
          zIndex: 0,
          height: "100%",
          width: "100%",
          display: "inline-block",
          position: "absolute",
          top: 0,
          left: 0
        }}
        onMouseDown={props.handleScrollMsDown}
        onMouseMove={props.handleMouseMove}
        onMouseUp={props.handleMouseUp}
        onMouseLeave={props.handleMouseUp}
      />
    </div>
  );
};

export default ListContainer;
