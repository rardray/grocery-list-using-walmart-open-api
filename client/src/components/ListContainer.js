import React from "react";
import "./Styles/main.css";
const ListContainer = props => {
  return (
    <div
      className="sidebar"
      onDragOver={props.onDragOver}
      onDrop={props.handleDrop}
    >
      <h5>Grocery List</h5>
      {props.children}
    </div>
  );
};

export default ListContainer;
