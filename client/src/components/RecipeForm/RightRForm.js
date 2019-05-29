import React from "react";
import Input from "../Forms/Input";
import TextArea from "../Forms/TextArea";
import H2 from "../H2";
export default function RightRForm(props) {
  return (
    <div
      className="r-form-container"
      style={{ width: props.device ? "100%" : "40%" }}
    >
      <H2 label={"Create New Recipe"} />
      <Input
        type="text"
        value={props.title}
        handleChange={props.changeTitle}
        labelName="Recipe Name"
        name={"title"}
        width="100%"
        validation={false}
      />
      <TextArea
        type="text"
        value={props.instructions}
        handleChange={props.changeText}
        labelName={"Instructions"}
        name="instructions"
        width="100%"
        validation={false}
      />
    </div>
  );
}
