import React from "react";
import Button from "../Styles/Button";
const ListContainer = props => {
  return (
    <div onDragOver={props.onDragOver} onDrop={props.handleDrop}>
      {props.children}
      <div id="list-block" style={{ marginBottom: 75 }}>
        <Button label="CLEAR LIST" click={props.clearList} />
      </div>
    </div>
  );
};

export default ListContainer;
