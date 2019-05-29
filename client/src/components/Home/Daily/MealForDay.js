import React from "react";
import plus from "../../Styles/plus.svg";
import go from "../../Styles/go.svg";
import ButtonLinks from "./ButtonLinks";
import BoxContainer from "../../BoxContainer";
import H4 from "../../H4";
import H3 from "../../H3";

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
      <BoxContainer class={"food-today"}>
        <div style={{ textAlign: "left" }}>
          {props.loader || (
            <>
              {today[0] ? <img src={today[0].mainId.image} alt="meal" /> : null}
              <div style={{ display: "inline-block" }}>
                <H4 label={"What's For Dinner..."} />
                <br />
                <H3
                  label={
                    today[0]
                      ? today[0].mainId.title
                      : "Nothing planned for today."
                  }
                />
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
                        url={"/grocery/meal/" + today[0]._id}
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
      </BoxContainer>
    </div>
  );
}
