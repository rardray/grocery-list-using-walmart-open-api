import React from "react";
import BoxContainer from "../BoxContainer";
import Button from "../Button";

export default function SingleItem(props) {
  return (
    <div style={{ padding: 10 }}>
      <BoxContainer>
        <div
          className="recipe"
          style={{
            display: "block",
            position: "relative",
            padding: 0
          }}
        >
          <div
            className="ingredients-block"
            style={{ height: 100, border: "none" }}
          >
            <img src={props.image} alt={props.title} />
            <h4>{props.title}</h4>
            <Button click={props.add} label={"Add to List"} />
          </div>
        </div>
      </BoxContainer>
    </div>
  );
}
