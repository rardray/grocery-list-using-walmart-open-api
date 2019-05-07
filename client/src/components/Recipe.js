import React, { useState, useEffect } from "react";
import { getRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import "./Styles/recipe.css";
import RecipeRender from "./RecipeRender";
import { useLoaderState } from "./Hooks";

export default function Recipe(props) {
  const [state, setState] = useState({
    title: "",
    instructions: "",
    ingredients: [],
    image: ""
  });

  const load = useLoaderState(
    getRequest,
    `/api/recipe/one/${props.id}`,
    apiToken(),
    data => {
      setState({ ...data.data });
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});

  const { title, instructions, ingredients, image } = state;
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        marginBottom: 125,
        marginTop: 20
      }}
    >
      {load || (
        <RecipeRender
          {...{ title, instructions, ingredients, image }}
          window={props.window}
          add={props.addToList}
          history={props.history}
        />
      )}
    </div>
  );
}
