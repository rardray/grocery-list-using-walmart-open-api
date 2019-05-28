import React from "react";

export default function RecipeWrapper(props) {
  return (
    <div className="recipe">
      <div className="r-contain">{props.children}</div>
    </div>
  );
}
