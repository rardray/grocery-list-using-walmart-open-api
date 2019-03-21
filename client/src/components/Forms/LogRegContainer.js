import React from "react";
var Themes = require("../Styles/Themes");

const Container = props => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        background: "black",
        paddingTop: "10%",
        paddingBottom: "20%",
        height: "100%"
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
