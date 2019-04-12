import React from "react";
import "./main.css";

export default function Button(props) {
  const { label, click } = props;
  return (
    <div>
      <button style={{ zIndex: 15 }} onClick={click}>
        {label}
      </button>
    </div>
  );
}
