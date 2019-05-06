import React from "react";

export default function RightRForm(props) {
  return (
    <div
      className="r-form-container"
      style={{ width: props.window ? "100%" : "40%" }}
    >
      <h2 className="header-orange" style={{ padding: 10 }}>
        Create New Recipe
      </h2>
      <label>Recipe Name</label>
      <br />
      <input
        className="input"
        style={{ width: "100%" }}
        type="text"
        value={props.title}
        onChange={props.changeTitle}
      />
      <br />
      <label>Instructions</label>
      <br />
      <textarea
        className="input"
        value={props.instructions}
        onChange={props.changeText}
        style={{ width: "100%" }}
      />
    </div>
  );
}
