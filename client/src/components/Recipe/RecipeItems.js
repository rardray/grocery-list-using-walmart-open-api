import React from "react";

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
            background: "white",
            cursor: "default"
          }}
        >
          In Cart
        </button>
      ) : (
        <button onClick={props.addToList}>Add to List</button>
      )}
    </div>
  );
}
