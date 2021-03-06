import React, { useState } from "react";
import Default from "../Styles/default.svg";
import Button from "../ThemedTags/Button";
import Label from "../ThemedTags/Label";

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
        <Label>
          {props.main
            ? "Main Course (required)"
            : single
            ? "Side (single Item)"
            : "Side (Recipe)"}
        </Label>
        {props.main ? null : (
          <Button click={handleRec} label={single ? "Recipe" : "Single Item"} />
        )}
        <select
          className="cust-select"
          value={props.value}
          onChange={props.change}
          placeholder={props.value}
        >
          <option />
          {(single ? props.history : props.recipes).map(el => {
            return (
              <option key={el._id} value={el._id}>
                {el.title}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
