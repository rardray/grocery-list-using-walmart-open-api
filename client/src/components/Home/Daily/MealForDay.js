import React from "react";
import plus from "../../Styles/plus.svg";
import edit from "../../Styles/edit.svg";
import go from "../../Styles/go.svg";
import ButtonLinks from "./ButtonLinks";

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
        {props.loader || (
          <>
            {today[0] ? <img src={today[0].mainId.image} alt="meal" /> : null}
            <div style={{ display: "inline-block" }}>
              <h4>What's For Dinner...</h4>
              <br />
              <h3>
                {today[0]
                  ? today[0].mainId.title
                  : "Nothing planned for today."}
              </h3>
            </div>
            <div
              style={{
                display: "inline-block",
                position: "absolute",
                bottom: 4,
                left: 0,
                boxSizing: "border-box",
                width: "100%",
                textAlign: "center",
                padding: 0,
                paddingTop: 6,
                borderTop: "1px solid #377fbb"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "space-evenly"
                }}
              >
                <ButtonLinks
                  url="/grocery/addrecipe"
                  image={plus}
                  label="new recipe"
                />
                {today[0] ? (
                  <>
                    <ButtonLinks
                      url="/recipe/caldata/edit"
                      image={edit}
                      label="edit meal"
                    />
                    <ButtonLinks
                      url="/grocery/recipe"
                      image={go}
                      label="view meal"
                    />
                  </>
                ) : (
                  <ButtonLinks
                    url={`/grocery/addplan/${props.month}/${props.year}/${
                      props.day
                    }`}
                    image={plus}
                    label="add meal"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
