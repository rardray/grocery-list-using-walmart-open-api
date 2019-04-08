import React from "react";
import { navigate } from "@reach/router";
export default function RecipesPreview(props) {
  return (
    <div>
      {props.recipes.map((el, i) => {
        return (
          <div
            id="preview-img"
            style={{ backgroundImage: `url(${el.image})` }}
            onClick={() => navigate("/grocery/recipe/" + el._id)}
          >
            <h4 id="header">{el.title}</h4>
          </div>
        );
      })}
    </div>
  );
}
