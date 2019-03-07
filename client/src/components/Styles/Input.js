import React from "react";
import "./main.css";
import check from "./check.png";
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
        if (input.match(e)) {
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
    const validNoBlur = () => {
      return validate(this.props.value, this.props.type);
    };
    const validated = () => {
      if (this.state.blurred) {
        return validate(this.props.value, this.props.type);
      } else {
        return true;
      }
    };
    const renderInput = () => {
      console.log("running");
      var classname = "input";
      if (!validated()) {
        return (
          <Themes.InputError
            className={classname}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
            onFocus={this.changeAn}
            autoFocus={this.state.nextAn ? false : true}
          />
        );
      } else if (this.state.blurred) {
        return (
          <Themes.InputAfterBlur
            className={classname}
            autoFocus={this.state.nextAn ? false : true}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
            placeholder={this.props.lableName}
            onFocus={this.changeAn}
          />
        );
      } else {
        return (
          <Themes.InputFocus
            id={this.props.name}
            className={classname}
            autoFocus={true}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
            onBlur={this.handleBlur}
            placeholder={this.props.lableName}
          />
        );
      }
    };
    return (
      <div style={{ margin: 0, padding: 0, marginLeft: 25 }}>
        {this.state.focus ? (
          <div
            style={{
              zIndex: 0,
              display: "inline-block",
              position: "relative",
              right: -100,
              top: 45,
              color: "blue",
              textAlign: "right",
              opacity: 0.9
            }}
          >
            {this.props.labelName}
          </div>
        ) : null}
        {this.props.label ? (
          <div>
            {!this.state.focus ? (
              <Themes.InputLabel
                for={this.props.name}
                onClick={this.handleFocus}
              >
                {this.props.labelName}
              </Themes.InputLabel>
            ) : validated() ? (
              <Themes.InputLabelFocus>
                {this.props.labelName}
              </Themes.InputLabelFocus>
            ) : (
              <div
                style={{
                  textAlign: "right",
                  marginRight: "25%",
                  padding: 0
                }}
              >
                <Themes.InputLabelError>
                  {this.props.errorMessage}
                </Themes.InputLabelError>
              </div>
            )}
          </div>
        ) : null}
        {this.state.focus ? (
          renderInput()
        ) : (
          <Themes.Input
            className="input"
            onFocus={this.handleFocus}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
            id={this.props.name}
          />
        )}
        <span>
          {validNoBlur() ? (
            <img src={check2} style={{ height: 25, width: 25 }} />
          ) : (
            <img
              src={x}
              style={{
                width: 25,
                height: 25,
                visibility: validated() ? "hidden" : "visible"
              }}
            />
          )}
        </span>
      </div>
    );
  }
}

export default Input;
