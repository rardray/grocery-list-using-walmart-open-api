import React, { useState, useEffect } from "react";
import Default from "./Styles/default.svg";

export default function MealSelect(props) {
  const [single, setSingle] = useState(false);
  function handleRec(e) {
    e.preventDefault();
    setSingle(!single);
  }
  let d = (single ? props.history : props.recipes).filter(el => {
    return el._id === props.sideX;
  });
  return (
    <>
      <div className="meals">
        <img src={d[0] ? d[0].image : Default} alt="select" className="meals" />
        <label>
          {props.main
            ? "Main Course (required)"
            : single
            ? "Side (single Item)"
            : "Side (Recipe)"}
        </label>
        {props.main ? null : (
          <button onClick={handleRec}>
            {single ? "Single Item" : "Recipe"}
          </button>
        )}
        <select value={props.value} onChange={props.change} className="input">
          <option />
          {(single ? props.history : props.recipes).map(el => {
            return <option value={el._id}>{el.title}</option>;
          })}
        </select>
      </div>
    </>
  );
}
