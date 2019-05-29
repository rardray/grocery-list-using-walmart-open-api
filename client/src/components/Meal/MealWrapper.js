import React from "react";
import H2 from "../H2";

export default function MealWrapper(props) {
  return (
    <div className="meal-items">
      <H2 label={props.header} />
      <p>{props.subheader}</p>
      {props.children}
    </div>
  );
}
