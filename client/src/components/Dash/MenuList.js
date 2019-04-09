import React from "react";

const MenuList = props => {
  return (
    <div id="menu-list">
      <div>{props.children}</div>
    </div>
  );
};

export default MenuList;
