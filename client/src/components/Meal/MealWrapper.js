import React from "react";
import H2 from "../H2";
import P from "../P";

export default function MealWrapper(props) {
  return (
    <div className="meal-items">
      <H2 label={props.header} />
      <P>{props.subheader}</P>
      {props.children}
    </div>
  );
}
