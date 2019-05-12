import React, { useState, useEffect, useContext } from "react";
import { getRequest, postRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import { months } from "./Home/Calander";
import MealSelect from "./MealSelect";
import HistoryContext from "./contextComponents/history.context";

import "./Styles/meals.css";
import { navigate } from "@reach/router";

export default function AddPlan(props) {
  const [recipes, setRecipes] = useState([]);
  const [main, setMain] = useState("");
  const [sideOne, setSideOne] = useState("");
  const [sideTwo, setSideTwo] = useState("");
  const { history } = useContext(HistoryContext);
  useEffect(() => {
    getRequest("/api/recipe/all/" + props.user._id, apiToken(), data =>
      setRecipes(data.data)
    );
  }, []);

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
        <div className="r-contain" style={{ marginTop: 20 }}>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              display: "block",
              color: "white",
              background: "#dc5c36",
              margin: 0,
              padding: 6,
              boxSizing: "border-box"
            }}
          >
            Create Meal for {months[props.mo]} {props.dy}, {props.ye}
          </h2>
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
            <button onClick={handleSubmit} className="button-blue-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
