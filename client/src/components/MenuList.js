import React from "react";

const MenuList = props => {
  return (
    <div id="menu-list">
      <div id="menu-header">{props.header}</div>
      <div>{props.children}</div>
    </div>
  );
};

export default MenuList;
