import React from "react";

export default function MealForDay(props) {
  const today = props.meals.filter(el => {
    return (
      el.dow[0] === props.month &&
      el.dow[1] === props.year &&
      el.dow[2] === props.day
    );
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div className="food-today">
        {today[0] ? <img src={today[0].mainId.image} alt="meal" /> : null}
        <h4>What's For Dinner:</h4>
        <h4>
          {today[0] ? today[0].mainId.title : "Nothing planned for today."}
        </h4>
      </div>
    </div>
  );
}
