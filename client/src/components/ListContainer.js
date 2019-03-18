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
    </div>
  );
};

export default ListContainer;
