import React, { useState, useEffect, useContext } from "react";
import { getRequest, postRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import { months } from "../Home/Calender/Calander";
import MealSelect from "./MealSelect";
import HistoryContext from "../contextComponents/history.context";
import "../Styles/meals.css";
import { navigate } from "@reach/router";
import BoxContainer from "../BoxContainer";
import Button from "../Button";
import H2 from "../H2";

export default function AddPlan(props) {
  const [recipes, setRecipes] = useState([]);
  const [main, setMain] = useState(props.main);
  const [sideOne, setSideOne] = useState(props.sideOne);
  const [sideTwo, setSideTwo] = useState(props.sideTwo);
  const [disabled, setDisabled] = useState(true);
  const { history } = useContext(HistoryContext);
  useEffect(() => {
    getRequest("/api/recipe/all/" + props.user._id, apiToken(), data =>
      setRecipes(data.data)
    );
  }, []);
  useEffect(() => {
    if (main) {
      setDisabled(false);
    }
  });
  const handleSubmit = e => {
    e.preventDefault();
    if (!main) {
      return;
    }
    let data = {
      dow: [props.mo, props.ye, props.dy],
      userId: props.user._id,
      mainId: main,
      sideOneId: sideOne,
      sideTwoId: sideTwo
    };
    postRequest(
      "/api/caldata/add",
      apiToken(),
      data,
      data => console.log(data.status),
      null,
      () => navigate("/")
    );
  };
  return (
    <>
      <div className="meal">
        <BoxContainer additionalStyles={{ marginTop: 10 }}>
          <H2
            label={`Create Meal for ${months[props.mo]} ${props.dy}, ${
              props.ye
            }`}
          />
          <div className="form-con">
            <MealSelect
              recipes={recipes}
              change={e => setMain(e.target.value)}
              value={main}
              history={history}
              sideX={main}
              main={true}
            />
            <MealSelect
              recipes={recipes}
              change={e => setSideOne(e.target.value)}
              value={sideOne}
              history={history}
              sideX={sideOne}
            />
            <MealSelect
              recipes={recipes}
              change={e => setSideTwo(e.target.value)}
              value={sideTwo}
              history={history}
              sideX={sideTwo}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              disabled={disabled}
              click={handleSubmit}
              class={"button-blue-full"}
              label={"Save"}
            />
          </div>
        </BoxContainer>
      </div>
    </>
  );
}
