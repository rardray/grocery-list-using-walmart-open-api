import React from "react";
import Button from "../ThemedTags/Button";
import H4 from "../ThemedTags/H4";
import P from "../ThemedTags/P";

export default function RecipeItems(props) {
  return (
    <div className="ingredients-block">
      <img src={props.image} alt={props.title} />
      <H4 label={props.title} />
      <P>{props.amount}</P>
      {props.disableAdd(props.cart, props.item) ? (
        <button
          style={{
            color: "slategray",
            background: "none",
            cursor: "default"
          }}
        >
          In Cart
        </button>
      ) : (
        <Button click={props.addToList} label={"Add to List"} />
      )}
    </div>
  );
}
