import React from "react";
import H2 from "../../H2";

export default function ListWrapper(props) {
  return (
    <div className="list-items">
      <H2 label={props.header} />
      <p>{props.subheader}</p>
      {props.children}
    </div>
  );
}
