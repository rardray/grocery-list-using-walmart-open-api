import React from "react";

export default function RecipeRender(props) {
  return (
    <div className="recipe">
      <div id="header" style={{ backgroundImage: `url(${props.image})` }}>
        <h2>{props.title}</h2>
      </div>
      <h3>Directions</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{props.instructions}</p>
      <h3>Ingredients</h3>
      {props.ingredients.map((el, i) => {
        return (
          <div
            id="ingredients-block"
            style={{ width: props.window ? "98%" : "48%" }}
            key={el.id}
          >
            <img src={el.image} alt={el.title} />
            <h4>{el.title}</h4>
            <p>{el.measure}</p>
            <button onClick={props.add.bind(this, i, el)}>Add to List</button>
          </div>
        );
      })}
    </div>
  );
}
