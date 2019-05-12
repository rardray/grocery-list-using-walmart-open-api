import React from "react";
import { addToList } from "./ListPages/listActions";

export default function RecipeRender(props) {
  function disableAdd(list, el) {
    const val = list.filter(ele => {
      return ele.historyId._id === el.historyId._id;
    });
    return val.length === 0 ? false : true;
  }
  return (
    <div className="recipe">
      <div className="r-contain">
        {props.load || (
          <>
            <div style={{ textAlign: "left" }}>
              <div
                id="header"
                style={{ backgroundImage: `url(${props.image})` }}
              >
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
                <div className="ingredients-block" key={el._id}>
                  <img src={el.historyId.image} alt={el.historyId.title} />
                  <h4>{el.historyId.title}</h4>
                  <p>{el.amount}</p>
                  {disableAdd(props.cart, el) ? (
                    <button
                      style={{
                        color: "slategray",
                        background: "white",
                        cursor: "default"
                      }}
                    >
                      In Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addToList(i, el.historyId, props.getCart)}
                    >
                      Add to List
                    </button>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
