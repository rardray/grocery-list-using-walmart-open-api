import React, { useState, useEffect } from "react";
import Calander from "./Calander";
import RecipesPreview from "./RecipesPreview";
import { apiToken } from "../Utility/appHelpers";
import { getRequest } from "../Utility/httpRequests";
import DefaultHome from "./DefaultHome";
import "../Styles/home.css";
import RecipeDrawer from "./RecipeDrawer";

export default function Home(props) {
  const [date, setDate] = useState({ day: null, year: null, month: null });
  const [position, setPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [recipes, setRecipe] = useState([]);

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
  }, {});
  useEffect(() => {
    getRequest("/api/recipe/all", apiToken(), data => setRecipe(data.data));
  }, {});
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
      {user ? (
        <div className="home">
          <div style={{ textAlign: "left" }} />
          <div
            style={{
              textAlign: "right",
              backgroundImage:
                "linear-gradient(to left, #8da0a7, rgba(0,0,0,0)",
              borderRadius: 15
            }}
          >
            <h2 style={{ color: "white" }}>Welcome, {user.firstName}</h2>
          </div>
          <Calander
            {...{ day, month, year, position, yPosition, moveUp, moveDn }}
          />
          <div style={{ textAlign: "left" }}>
            <h4>Your Recipes</h4>
          </div>
          <RecipesPreview {...{ recipes }} expanded={false} />
          {recipes.length > 6 ? (
            <RecipeDrawer {...{ recipes }}>
              <RecipesPreview {...{ recipes }} expanded={true} />
            </RecipeDrawer>
          ) : null}
        </div>
      ) : (
        <div className="home" style={{ textAlign: "center" }}>
          <DefaultHome />
        </div>
      )}
    </>
  );
}
