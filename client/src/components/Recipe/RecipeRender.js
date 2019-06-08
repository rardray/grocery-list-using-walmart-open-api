import React from "react";
import { addToList } from "../Utility/listActions";
import RecipeItems from "./RecipeItems";
import H3 from "../ThemedTags/H3";
import P from "../ThemedTags/P";

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
            <H3 label="Directions" />
            <P whiteSpace="pre-wrap" margin={10}>
              {props.instructions}
            </P>
            <H3 label="Ingredients" />
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
                addToList={() =>
                  addToList(
                    i,
                    { ...el.historyId, userId: props.user._id },
                    props.getCart
                  )
                }
              />
            );
          })}
        </>
      )}
    </>
  );
}
