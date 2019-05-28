import React, { useContext } from "react";
import Button from "../Styles/Button";
import { clearList } from "../Utility/listActions";
import CartContext from "../contextComponents/cart.context";
const ListContainer = props => {
  const { clearAll } = useContext(CartContext);
  return (
    <div>
      {props.children}
      <div id="list-block" style={{ marginBottom: 75 }}>
        <Button label="CLEAR LIST" click={() => clearList(clearAll)} />
      </div>
    </div>
  );
};

export default ListContainer;
