import React from "react";
import "./Styles/main.css";
import Button from "./Styles/Button";
const ListContainer = props => {
  return (
    <div
      className="sidebar"
      onDragOver={props.onDragOver}
      onDrop={props.handleDrop}
    >
      <h5>Grocery List</h5>
      {props.children}
      <Button label="C L E A R  L I S T" click={props.clearList} />
    </div>
  );
};

export default ListContainer;
