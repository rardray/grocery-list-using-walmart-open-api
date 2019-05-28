import React from "react";

export default function ListWrapper(props) {
  return (
    <div className="list-items">
      <h2 className="header-orange">{props.header}</h2>
      <p>{props.subheader}</p>
      {props.children}
    </div>
  );
}
