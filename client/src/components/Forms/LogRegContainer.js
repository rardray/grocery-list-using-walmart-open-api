import React from "react";
import BoxContainer from "../BoxContainer";
import P from "../P";

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
      <BoxContainer
        additionalStyles={{ width: "90%", textAlign: "center", margin: "auto" }}
      >
        <h1>{props.header}</h1>
        <P>{props.subheader}</P>
        {props.children}
      </BoxContainer>
    </div>
  );
};

export default Container;
