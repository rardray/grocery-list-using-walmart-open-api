import React from "react";
import BoxContainer from "../BoxContainer";

export default function RecipeWrapper(props) {
  return (
    <div className="recipe">
      <BoxContainer>{props.children}</BoxContainer>
    </div>
  );
}
