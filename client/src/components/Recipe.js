import React, { useState, useEffect } from "react";
import { getRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import "./Styles/recipe.css";
import RecipeRender from "./RecipeRender";
import Loader from "./Loader";

export default function Recipe(props) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});
  useEffect(() => {
    getRequest(`/api/recipe/one/${props.id}`, apiToken(), data => {
      setTitle(data.data.title);
      setInstructions(data.data.instructions);
      setImage(data.data.image);
      setIngredients(data.data.ingredients);
      setLoad(true);
    });
  }, {});
  return (
    <div style={{ display: "flex", margin: "auto", marginBottom: 125 }}>
      {loading ? (
        <RecipeRender
          {...{ title, instructions, ingredients, image }}
          window={props.window}
          add={props.addToList}
          history={props.history}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
