import React, { useState, useEffect, useContext } from "react";
import Calander from "./Calender/Calander";
import RecipesPreview from "./RecipeBlock/RecipesPreview";
import { apiToken } from "../Utility/appHelpers";
import { getRequest } from "../Utility/httpRequests";
import "../Styles/home.css";
import RecipeDrawer from "./RecipeBlock/RecipeDrawer";
import MealForDay from "./Daily/MealForDay";
import { useLoaderState } from "../Utility/Hooks";
import BoxContainer from "../BoxContainer";
import H2 from "../H2";
import HomeContainer from "./HomeContainer";
import HistoryContext from "../contextComponents/history.context";

export default function Home(props) {
  const [date, setDate] = useState({ day: null, year: null, month: null });
  const [position, setPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [recipes, setRecipe] = useState([]);
  const [meals, setMeals] = useState([]);
  const { getList } = useContext(HistoryContext);
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
  useEffect(() => {
    getList();
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
      <HomeContainer device={props.device}>
        <H2 label={`Welcome, ${user.firstName}`} />
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
        <BoxContainer additinalStyles={{ height: "auto" }}>
          <H2 label={"Your Recipes"} />
          {loadRecipe || <RecipesPreview {...{ recipes }} expanded={false} />}
          {recipes.length > 6 ? (
            <RecipeDrawer {...{ recipes }}>
              <RecipesPreview {...{ recipes }} expanded={true} />
            </RecipeDrawer>
          ) : null}
        </BoxContainer>
      </HomeContainer>
    </>
  );
}
