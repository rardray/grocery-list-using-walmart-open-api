import React from "react";

export default function RecipeRender(props) {
  function disableAdd(list, el) {
    const val = list.filter(ele => {
      return ele.id === el.id && ele.inCart;
    });
    return val.length === 0 ? false : true;
  }
  return (
    <div className="recipe">
      <div className="r-contain">
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
            <div className="ingredients-block" key={el.id}>
              <img src={el.image} alt={el.title} />
              <h4>{el.title}</h4>
              <p>{el.measure}</p>
              {disableAdd(props.history, el) ? (
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
                <button onClick={props.add.bind(this, i, el)}>
                  Add to List
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
