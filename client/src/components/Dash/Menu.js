import React, { useState } from "react";
import "../Styles/menu.css";

export default function Menu(props) {
  const [expanded, handleClick] = useState(false);
  return (
    <div
      className="menu-anchor"
      onClick={() => handleClick(!expanded)}
      onMouseLeave={expanded ? () => handleClick(!expanded) : null}
    >
      {expanded ? props.children : null}
      <div id="inner">
        <div id="line" />

        <div id="line" />
      </div>
    </div>
  );
}
