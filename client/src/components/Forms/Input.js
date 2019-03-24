import React, { useState } from "react";
import x from "../Styles/x.png";
import check2 from "../Styles/check2.png";
import validate from "./validation";
var Themes = require("../Styles/Themes");

export default function Input(props) {
  const [focus, setFocus] = useState(false);
  const [blurred, setBlur] = useState(false);
  const [nextAn, setAn] = useState(false);
  const {
    name,
    value,
    type,
    handleChange,
    labelName,
    label,
    errorMessage
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
  const renderInput = () => {
    var classname = "input";
    if (!valid) {
      return (
        <Themes.InputError
          className={classname}
          {...{ type, name, value }}
          onChange={handleChange}
          onFocus={() => setAn(false)}
          autoFocus={nextAn ? false : true}
        />
      );
    } else if (blurred) {
      return (
        <Themes.InputAfterBlur
          className={classname}
          autoFocus={nextAn ? false : true}
          {...{ type, name, value }}
          onChange={handleChange}
          placeholder={labelName}
          onFocus={() => setAn(false)}
        />
      );
    } else {
      return (
        <Themes.InputFocus
          id={name}
          className={classname}
          autoFocus={true}
          {...{ type, name, value }}
          onChange={handleChange}
          onBlur={() => {
            setAn(true);
            setBlur(!blurred);
          }}
          placeholder={labelName}
        />
      );
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, marginLeft: 25 }}>
      {label ? (
        <div>
          {!focus ? (
            <Themes.InputLabel onClick={() => setFocus(!focus)}>
              {labelName}
            </Themes.InputLabel>
          ) : valid ? (
            <Themes.InputLabelFocus>{labelName}</Themes.InputLabelFocus>
          ) : (
            <div
              style={{
                textAlign: "center",
                marginRight: "auto",
                padding: 0
              }}
            >
              <Themes.InputLabelError>{errorMessage}</Themes.InputLabelError>
            </div>
          )}
        </div>
      ) : null}
      {focus ? (
        renderInput()
      ) : (
        <Themes.Input
          className="input"
          onFocus={() => setFocus(!focus)}
          {...{ type, name, value }}
          onChange={handleChange}
          id={name}
        />
      )}
      <span>
        {validNoBlur() ? (
          <img src={check2} alt={name} style={{ height: 25, width: 25 }} />
        ) : (
          <img
            src={x}
            style={{
              width: 25,
              height: 25,
              visibility: valid ? "hidden" : "visible"
            }}
            alt={name}
          />
        )}
      </span>
    </div>
  );
}
