import React from "react";
import H2 from "../../ThemedTags/H2";
import P from "../../ThemedTags/P";

export default function ListWrapper(props) {
  return (
    <div className="list-items">
      <H2 label={props.header} />
      <P>{props.subheader}</P>
      {props.children}
    </div>
  );
}
