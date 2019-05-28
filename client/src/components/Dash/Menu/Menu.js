import React, { useState } from "react";

export default function Menu(props) {
  const [expanded, handleClick] = useState(false);
  return (
    <div
      className="menu-anchor"
      onClick={() => handleClick(!expanded)}
      onMouseLeave={expanded ? () => handleClick(!expanded) : null}
    >
      {expanded ? props.children : null}

      <img
        src={props.image}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: -1
        }}
        alt="menu"
      />
    </div>
  );
}
