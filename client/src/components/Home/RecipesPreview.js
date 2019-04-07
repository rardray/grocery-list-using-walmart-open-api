import React from "react";

export default function RecipesPreview(props) {
  return (
    <div>
      {props.recipes.map((el, i) => {
        return (
          <div id="preview-img" style={{ backgroundImage: `url(${el.image})` }}>
            <h4 id="header">{el.title}</h4>
          </div>
        );
      })}
    </div>
  );
}
