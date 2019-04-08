import React, { useState, useEffect } from "react";
import Calander from "./Calander";
import RecipesPreview from "./RecipesPreview";
import { apiToken } from "../Utility/appHelpers";
import { getRequest } from "../Utility/httpRequests";
import "../Styles/home.css";

export default function Home(props) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [position, setPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [recipes, setRecipe] = useState([]);

  useEffect(() => {
    const n = new Date();
    function getDates() {
      setYear(n.getFullYear());
      setMonth(n.getMonth());
      setDay(n.getDate());
    }
    setInterval(getDates, 1000 * 60 * 60);
    getDates();
    return function cleanup() {
      clearInterval(getDates, 1000 * 60 * 60);
    };
  }, {});
  useEffect(() => {
    getRequest("/api/recipe/all", apiToken(), data => setRecipe(data.data));
  }, [recipes]);
  const moveUp = () => {
    if (position + month === 11) {
      setPosition(0 - month);
      setYPosition(yPosition + 1);
    } else {
      setPosition(position + 1);
    }
  };
  const moveDn = () => {
    if (position + month === 0) {
      setPosition(11 - month);
      setYPosition(yPosition - 1);
    } else {
      setPosition(position - 1);
    }
  };

  const { user } = props;
  return (
    <div>
      <div className="home">
        <h4>Welcome, {user.firstName}</h4>
        <Calander
          {...{ year, month, day, position, yPosition, moveUp, moveDn }}
        />
        <h4>Your Recipes</h4>
        <RecipesPreview {...{ recipes }} />
      </div>
    </div>
  );
}
