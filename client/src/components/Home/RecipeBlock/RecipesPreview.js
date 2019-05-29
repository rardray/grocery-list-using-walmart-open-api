import React from "react";
import { navigate } from "@reach/router";

export default function RecipesPreview(props) {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        zIndex: 0,
        textAlign: "center",
        display: "inline-block",
        position: "relative"
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {props.recipes.map((el, i) => {
          if (!props.expanded) {
            if (i > 5) {
              return null;
            }
          } else {
            if (i <= 5) {
              return null;
            }
          }
          return (
            <div
              key={el._id}
              className="preview-img"
              style={{
                backgroundImage: `url(${el.image})`
              }}
              onClick={() => navigate("/grocery/recipe/" + el._id)}
            >
              <h4 className="header">{el.title}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
