import React from "react";
import plus from "../Styles/plus.svg";
import edit from "../Styles/edit.svg";
import { Link } from "@reach/router";
import go from "../Styles/go.svg";

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
                {today[0] ? (
                  <div
                    style={{
                      display: "inline-block",
                      position: "relative",
                      marginLeft: 10,
                      marginRight: 10
                    }}
                  >
                    <Link to="/recipe/caldata/edit">
                      <img
                        src={edit}
                        alt="edit"
                        style={{ width: 25, height: 25, margin: 0 }}
                      />
                      <br />
                      edit meal
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "inline-block",
                      position: "relative",
                      marginLeft: 10,
                      marginRight: 10
                    }}
                  >
                    <Link to="/grocery/addplan/:mo/:ye/:dy">
                      <img
                        src={plus}
                        alt="add"
                        style={{ width: 25, height: 25, margin: 0 }}
                      />
                      <br />
                      add meal
                    </Link>
                  </div>
                )}
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Link to="/grocery/addrecipe">
                    <img
                      src={plus}
                      alt="add"
                      style={{ width: 25, height: 25, margin: 0 }}
                    />
                    <br />
                    new recipe
                  </Link>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    position: "relative",
                    marginLeft: 10,
                    marginRight: 10
                  }}
                >
                  <Link to="/grocery/recipe">
                    <img
                      src={go}
                      alt="add"
                      style={{
                        width: 25,
                        height: 25,
                        margin: 0,
                        borderRadius: 0
                      }}
                    />
                    <br />
                    view meal
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
