import React from "react";
import Button from "../Button";

export default function RecipeItems(props) {
  return (
    <div className="ingredients-block">
      <img src={props.image} alt={props.title} />
      <h4>{props.title}</h4>
      <p>{props.amount}</p>
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
