import React from "react";
import Button from "../Styles/Button";
const ListContainer = props => {
  return (
    <div onDragOver={props.onDragOver} onDrop={props.handleDrop}>
      {props.children}
      <Button label="CLEAR LIST" click={props.clearList} />
    </div>
  );
};

export default ListContainer;
