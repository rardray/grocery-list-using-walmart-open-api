import React, { useState, useContext } from "react";
import x from "../Styles/x.png";
import check2 from "../Styles/check2.png";
import validate from "./validation";
import Span from "../Span";
import ThemesContext from "../contextComponents/themes.context";
export default function Input(props) {
  const [focus, setFocus] = useState(false);
  const [blurred, setBlur] = useState(false);
  const { theme } = useContext(ThemesContext);
  const {
    name,
    value,
    type,
    handleChange,
    labelName,
    errorMessage,
    validation
  } = props;
  const validNoBlur = () => {
    return validate(value, type);
  };
  const validated = () => {
    if (blurred) {
      return validate(value, type);
    } else {
      return true;
    }
  };
  const valid = validated();

  const Input = {
    background: focus ? "#f0ffff" : "#377fbb",
    borderBottom: validation
      ? blurred
        ? valid
          ? null
          : "2px solid red"
        : null
      : null,
    padding: focus ? null : 0,
    height: focus ? null : 2,
    transition: "0.2s ease-in-out",
    width: props.width || null
  };
  const Label = {
    color: validation ? (valid ? null : "red") : theme.tertiaryText,
    margin: 0,
    padding: 0,
    fontSize: focus ? (blurred ? "10pt" : 0) : "12pt",
    fontWeight: 300,
    display: "inline-block",
    cursor: "text",
    visibility: focus
      ? blurred
        ? valid
          ? "hidden"
          : "visible"
        : "hidden"
      : "visible",
    transition: "0.2s ease-in-out",
    opacity: focus ? (blurred ? 1 : 0) : 1
  };
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <div
        style={{
          textAlign: "center",
          marginRight: "auto",
          padding: 0
        }}
      >
        <label
          htmlFor={name}
          name={name}
          style={Label}
          onClick={() => setFocus(true)}
        >
          {valid ? labelName : errorMessage}
        </label>
      </div>
      <input
        className="input"
        style={Input}
        id={name}
        {...{ type, value, name }}
        placeholder={labelName}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setBlur(true)}
      />
      {validation ? (
        <Span>
          <img
            src={valid ? check2 : x}
            alt={name}
            style={{
              height: 25,
              width: 25,
              visibility: blurred
                ? "visible"
                : validNoBlur()
                ? "visible"
                : "hidden"
            }}
          />
        </Span>
      ) : null}
    </div>
  );
}
