import React from "react";
import BoxContainer from "../BoxContainer";
import P from "../ThemedTags/P";
import H2 from "../ThemedTags/H2";

const Container = props => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "block",

        paddingTop: "20%",
        paddingBottom: "20%",
        height: "100%"
      }}
    >
      <BoxContainer
        additionalStyles={{ width: "90%", textAlign: "center", margin: "auto" }}
      >
        <H2 label={props.header} />
        <P>{props.subheader}</P>
        {props.children}
      </BoxContainer>
    </div>
  );
};

export default Container;
