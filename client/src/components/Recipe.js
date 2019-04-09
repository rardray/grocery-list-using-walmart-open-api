import React, { useState, useEffect } from "react";
import { getRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import "./Styles/recipe.css";

export default function Recipe(props) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});
  useEffect(() => {
    getRequest(`/api/recipe/one/${props.id}`, apiToken(), data => {
      setTitle(data.data.title);
      setInstructions(data.data.instructions);
      setImage(data.data.image);
      setIngredients(data.data.ingredients);
    });
  }, {});
  return (
    <div style={{ display: "flex", height: "auto" }}>
      <div className="recipe">
        <div id="header" style={{ backgroundImage: `url(${image})` }}>
          <h2>{title}</h2>
        </div>
        <h3>Directions</h3>
        <p>{instructions}</p>
        <h3>Ingredients</h3>
        {ingredients.map((el, i) => {
          return (
            <div id="ingredients-block" key={el.id}>
              <img src={el.image} alt={el.title} />
              <h4>{el.title}</h4>
              <p>{el.measure}</p>
              <button onClick={props.addToList.bind(this, i, el)}>
                Add to List
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
