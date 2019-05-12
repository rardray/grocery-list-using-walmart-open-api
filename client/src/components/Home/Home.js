import React, { useState, useEffect } from "react";
import Calander from "./Calander";
import RecipesPreview from "./RecipesPreview";
import { apiToken } from "../Utility/appHelpers";
import { getRequest } from "../Utility/httpRequests";
import "../Styles/home.css";
import RecipeDrawer from "./RecipeDrawer";
import MealForDay from "./MealForDay";
import { useLoaderState } from "../Hooks";
export default function Home(props) {
  const [date, setDate] = useState({ day: null, year: null, month: null });
  const [position, setPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [recipes, setRecipe] = useState([]);
  const [meals, setMeals] = useState([]);

  const loadState = useLoaderState(
    getRequest,
    "/api/caldata/all/" + props.user._id,
    apiToken(),
    data => setMeals(data.data)
  );

  const loadRecipe = useLoaderState(
    getRequest,
    "/api/recipe/all/" + props.user._id,
    apiToken(),
    data => setRecipe(data.data)
  );
  useEffect(() => {
    const n = new Date();
    function getDates() {
      setDate({
        year: n.getFullYear(),
        month: n.getMonth(),
        day: n.getDate()
      });
    }
    setInterval(getDates, 1000 * 60 * 60);
    getDates();
    return function cleanup() {
      clearInterval(getDates, 1000 * 60 * 60);
    };
  }, []);

  const moveUp = () => {
    if (position + date.month === 11) {
      setPosition(0 - date.month);
      setYPosition(yPosition + 1);
    } else {
      setPosition(position + 1);
    }
  };
  const moveDn = () => {
    if (position + date.month === 0) {
      setPosition(11 - date.month);
      setYPosition(yPosition - 1);
    } else {
      setPosition(position - 1);
    }
  };
  const { user } = props;
  const { day, month, year } = date;
  return (
    <>
      <div className="home" style={{ width: props.device ? "100%" : null }}>
        <div style={{ textAlign: "left" }} />
        <div
          style={{
            background: "#dc5c36"
          }}
        >
          <h2 style={{ color: "white" }}>Welcome, {user.firstName}</h2>
        </div>
        <MealForDay {...{ day, month, year, meals }} loader={loadState} />
        {loadState || (
          <Calander
            {...{
              day,
              month,
              year,
              position,
              yPosition,
              moveUp,
              moveDn,
              meals
            }}
          />
        )}
        <div className="r-contain" style={{ height: "auto" }}>
          <div style={{ textAlign: "center" }}>
            <h2 className="header-orange">Your Recipes</h2>
          </div>
          {loadRecipe || <RecipesPreview {...{ recipes }} expanded={false} />}
          {recipes.length > 6 ? (
            <RecipeDrawer {...{ recipes }}>
              <RecipesPreview {...{ recipes }} expanded={true} />
            </RecipeDrawer>
          ) : null}
        </div>
      </div>
    </>
  );
}
