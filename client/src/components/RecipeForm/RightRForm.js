import React from "react";

export default function RightRForm(props) {
  return (
    <div
      className="r-form-container"
      style={{ maxWidth: props.window ? "98%" : "40%" }}
    >
      <h2 style={{ marginTop: 0 }}>Create New Recipe</h2>
      <label>Recipe Name</label>
      <br />
      <input
        style={{ width: "100%" }}
        type="text"
        value={props.title}
        onChange={props.changeTitle}
      />
      <br />
      <label>Instructions</label>
      <br />
      <textarea
        value={props.instructions}
        onChange={props.changeText}
        style={{ width: "100%" }}
      />
    </div>
  );
}
