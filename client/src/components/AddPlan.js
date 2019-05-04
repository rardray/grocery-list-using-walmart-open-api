import React, { useState, useEffect } from "react";
import { getRequest, postRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import { months } from "./Home/Calander";

export default function AddPlan(props) {
  const [recipes, setRecipes] = useState([]);
  const [main, setMain] = useState("");
  const [sideOne, setSideOne] = useState("");
  const [sideTwo, setSideTwo] = useState("");
  const [single, setSingle] = useState(false);
  const [single2, setSingle2] = useState(false);
  useEffect(() => {
    getRequest("/api/recipe/all", apiToken(), data => setRecipes(data.data));
  }, {});

  function handleRec(e) {
    e.preventDefault();
    setSingle(!single);
  }
  function handleRec2(e) {
    e.preventDefault();
    setSingle2(!single);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!main) {
      return;
    }

    let data = {
      dow: [props.mo, props.ye, props.dy],
      mainId: main,
      sideOneId: sideOne,
      sideTwoId: sideTwo
    };
    postRequest("/api/caldata/add", apiToken(), data);
  }
  return (
    <>
      <div
        className="list-items"
        style={{
          display: "block",
          margin: "auto",
          marginBottom: 125,
          padding: 20,
          marginTop: 100
        }}
      >
        <h2 style={{ textAlign: "right", width: "100%", display: "block" }}>
          Create Meal for {months[props.mo]} {props.dy}, {props.ye}
        </h2>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label>Main Course</label>
          <br />
          <select
            className="input"
            type="text"
            value={main}
            onChange={e => setMain(e.target.value)}
          >
            <option />
            {recipes.map(el => {
              return <option value={el._id}>{el.title}</option>;
            })}
          </select>
          <button onClick={handleRec}>
            {single ? "Single Item" : "Recipe"}
          </button>
          <label>{single ? "Side (single Item)" : "Side (Recipe)"}</label>
          <select
            value={sideOne}
            onChange={e => setSideOne(e.target.value)}
            className="input"
          >
            <option />
            {single
              ? props.history.map(el => {
                  return <option value={el._id}>{el.title}</option>;
                })
              : recipes.map(el => {
                  return <option value={el._id}>{el.title}</option>;
                })}
          </select>
          <button onClick={handleRec2}>
            {single2 ? "Single Item" : "Recipe"}
          </button>
          <label>{single2 ? "Side (single Item)" : "Side (Recipe)"}</label>
          <select
            value={sideTwo}
            onChange={e => setSideTwo(e.target.value)}
            className="input"
          >
            <option />
            {single2
              ? props.history.map(el => {
                  return <option value={el._id}>{el.title}</option>;
                })
              : recipes.map(el => {
                  return <option value={el._id}>{el.title}</option>;
                })}
          </select>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
