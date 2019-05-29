import React, { useState } from "react";
import Expand from "../../Styles/expand-button.svg";
import P from "../../P";

export default function RecipeDrawer(props) {
  const [expanded, setExpand] = useState(false);
  return (
    <>
      <div
        className={
          expanded ? "recipe-drawer-container-show" : "recipe-drawer-container"
        }
      >
        {props.children}
      </div>
      <div
        style={{
          textAlign: "left",
          padding: 4,
          borderBottom: "2px solid #8da0a7 "
        }}
      >
        <div
          onClick={() => setExpand(!expanded)}
          style={{ width: 150, cursor: "pointer" }}
        >
          <img
            className="recipe-expand"
            src={Expand}
            alt="expand"
            style={{
              height: 15,
              float: "left",
              margin: 6,
              transform: expanded ? `rotate(0deg)` : `rotate(180deg)`,
              transition: `transform ease-out 0.45s`
            }}
          />
          <P style={{ padding: 4 }}>
            {expanded ? "Hide" : "Show"} remaining {props.recipes.length - 6}{" "}
            recipes
          </P>
        </div>
      </div>
    </>
  );
}
