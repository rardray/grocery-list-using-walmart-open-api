import React from "react";
var Themes = require("./Themes");

const Container = props => {
  return (
    <div
      style={{
        padding: "25%",
        display: "block",
        background: "black",
        paddingTop: "10%"
      }}
    >
      <div style={Themes.dark.div}>
        <h1>{props.header}</h1>
        <p>{props.subheader}</p>
        {props.children}
      </div>
    </div>
  );
};

export default Container;
