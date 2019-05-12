import React from "react";
var Themes = require("../Styles/Themes");

const Container = props => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        background: "#377fbb",
        paddingTop: "20%",
        paddingBottom: "20%",
        height: "100%"
      }}
    >
      <div
        className="r-contain"
        style={{ width: "90%", textAlign: "center", margin: "auto" }}
      >
        <h1>{props.header}</h1>
        <p>{props.subheader}</p>
        {props.children}
      </div>
    </div>
  );
};

export default Container;
