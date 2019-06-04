import React, { useContext } from "react";
import { clearList } from "../Utility/listActions";
import CartContext from "../contextComponents/cart.context";
import Button from "../ThemedTags/Button";

const ListContainer = props => {
  const { clearAll } = useContext(CartContext);
  return (
    <div>
      {props.children}
      <div id="list-block" style={{ marginBottom: 75 }}>
        <Button label="Clear List" click={() => clearList(clearAll)} />
      </div>
    </div>
  );
};

export default ListContainer;
