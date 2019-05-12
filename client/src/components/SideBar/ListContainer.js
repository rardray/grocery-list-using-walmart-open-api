import React from "react";
import Button from "../Styles/Button";
import { clearList } from "../ListPages/listActions";
const ListContainer = props => {
  return (
    <div>
      {props.children}
      <div id="list-block" style={{ marginBottom: 75 }}>
        <Button
          label="CLEAR LIST"
          click={() => clearList(props.user, props.clearAll)}
        />
      </div>
    </div>
  );
};

export default ListContainer;
