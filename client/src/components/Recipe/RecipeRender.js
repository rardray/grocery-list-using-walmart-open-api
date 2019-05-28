import React from "react";
import { addToList } from "../Utility/listActions";
import RecipeItems from "./RecipeItems";

export default function RecipeRender(props) {
  function disableAdd(list, el) {
    const val = list.filter(ele => {
      return ele.historyId._id === el.historyId._id;
    });
    return val.length === 0 ? false : true;
  }
  return (
    <>
      {props.load || (
        <>
          <div style={{ textAlign: "left" }}>
            <div id="header" style={{ backgroundImage: `url(${props.image})` }}>
              <h2>{props.title}</h2>
            </div>
            <h3>Directions</h3>
            <p style={{ whiteSpace: "pre-wrap", marginLeft: 10 }}>
              {props.instructions}
            </p>
            <h3>Ingredients</h3>
          </div>
          {props.ingredients.map((el, i) => {
            return (
              <RecipeItems
                key={el._id}
                image={el.historyId.image}
                title={el.historyId.title}
                amount={el.amount}
                disableAdd={disableAdd}
                cart={props.cart}
                item={el}
                addToList={() => addToList(i, el.historyId, props.getCart)}
              />
            );
          })}
        </>
      )}
    </>
  );
}
