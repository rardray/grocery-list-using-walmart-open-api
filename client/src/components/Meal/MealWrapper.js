import React from "react";

export default function MealWrapper(props) {
  return (
    <div className="meal-items">
      <h2 className="header-orange">{props.header}</h2>
      <p>{props.subheader}</p>
      {props.children}
    </div>
  );
}
