import React, { useState, useEffect } from "react";
import { getRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import Recipe from "./Recipe";

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRequest("/api/recipe/all", apiToken(), data => setRecipes(data.data));
  }, {});
  return (
    <>
      {recipes.map(el => {
        return (
          <div>
            <Recipe id={el._id} {...props} />
          </div>
        );
      })}
    </>
  );
}
