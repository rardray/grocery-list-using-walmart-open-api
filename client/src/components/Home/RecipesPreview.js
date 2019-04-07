import React from "react";

export default function RecipesPreview(props) {
  return (
    <div>
      {props.recipes.map((el, i) => {
        if (i > 4) {
          return null;
        }
        return <h4>{el.title}</h4>;
      })}
    </div>
  );
}
