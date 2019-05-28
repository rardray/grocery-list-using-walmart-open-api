import React from "react";

export default function SingleItem(props) {
  return (
    <div style={{ padding: 10 }}>
      <div className="r-contain">
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
            <button onClick={props.add}>Add to List</button>
          </div>
        </div>
      </div>
    </div>
  );
}
