import React from "react";
import "./main.css";
import x from "./x.png";
import check2 from "./check2.png";
var Themes = require("./Themes");

function validate(input, name) {
  if (name === "text") {
    return input.length >= 1 && input.length < 50 && !input.match(/ /);
  }
  if (name === "password") {
    return (
      input.length >= 6 &&
      input.length < 24 &&
      input.match(/[A-Z]/) &&
      input.match(/[0-9]/) &&
      !input.match(/ /)
    );
  }
  if (name === "email") {
    const suffixes = [".com", ".net", ".org", ".biz", ".edu"];
    function matchSuff() {
      const matches = suffixes.map(e => {
        if (!input.match(e)) {
          e = false;
        } else {
          return e;
        }
      });
      var newOne = matches.filter(e => e !== undefined);
      if (newOne.length === 1) {
        return newOne.toString();
      }
    }
    return (
      input.length > 6 &&
      input.length < 50 &&
      matchSuff() &&
      input.match("@") &&
      input.indexOf("@") + 1 < input.indexOf(matchSuff()) &&
      input.indexOf("@") > 1 &&
      input.indexOf(matchSuff()) === input.length - 4 &&
      !input.match(/ /)
    );
  }
}

class Input extends React.Component {
  state = {
    focus: false,
    blurred: false,
    nextAn: false
  };

  handleFocus = e => {
    e.preventDefault();
    this.setState({ focus: !this.state.focus });
  };
  handleBlur = e => {
    e.preventDefault();
    this.setState({ blurred: !this.state.blurred, nextAn: true });
  };
  changeAn = e => {
    e.preventDefault();
    this.setState({ nextAn: false });
  };
  render() {
    const {
      name,
      value,
      type,
      handleChange,
      labelName,
      label,
      errorMessage
    } = this.props;
    const { blurred, focus, nextAn } = this.state;
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
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={this.changeAn}
            autoFocus={nextAn ? false : true}
          />
        );
      } else if (blurred) {
        return (
          <Themes.InputAfterBlur
            className={classname}
            autoFocus={nextAn ? false : true}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={labelName}
            onFocus={this.changeAn}
          />
        );
      } else {
        return (
          <Themes.InputFocus
            id={name}
            className={classname}
            autoFocus={true}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={this.handleBlur}
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
              <Themes.InputLabel onClick={this.handleFocus}>
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
            onFocus={this.handleFocus}
            type={type}
            name={name}
            value={value}
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
}

export default Input;
