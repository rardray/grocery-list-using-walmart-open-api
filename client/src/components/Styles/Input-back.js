import React from "react";
import "./main.css";
import check from "./check.png";
import x from "./x.png";
import check2 from "./check2.png";
import styled, { keyframes, css } from "styled-components";
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
const inputKeyframes = keyframes`
  0% {background: lightslategray; height: 2px; }
  100% {background: lightgrey; height: 22px;}`;
const inputAnimation = props => {
  css`
    ${inputKeyframes} 5s ease-in-out 1;
  `;
};

/*export const Input = styled.input`
  background: lightslategray;
  border-bottom: 1px solid slategray;
  padding: 0px;
  height: 2px;
`;
export const InputFocus = styled.input`
  border-radius: 6px;
  border-bottom: ${!validated()
    ? "border-bottom: 3px solid red"
    : "3px solid lightblue"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  outline: none;
  line-height: 25px;
  padding-bottom: 0px;
  margin: 2px;
  overflow: visible;
  animation: ${this.state.focus && !this.state.blurred
    ? `${inputKeyframes} 0.2s ease-in-out 1`
    : !validated()
    ? `${errAnimation} 1s ease-in-out alternate`
    : "none"};
`;*/

const focusAnimation = function(props) {
  css`
    ${inputKeyframes} 0.2s ease -in -out 1;
  `;
};
const errAnimation = keyframes`
  0% {border-bottom: 3px solid lightred; }
  100% { border-bottom: 3px solid darkred;}`;

// INPUT LABEL ***************

const labelAnimation = keyframes`
  0% {visibility: visible; font-size: 12pt; font-weight: 300;  height: auto;}
  100% { visibility: hidden; font-size: 0pt; font-weight: 300; height: 0px; }`;

export const InputLabel = styled.label`
  margin: 0px;
  padding: 0px;
  font-size: 12pt;
  font-weight: 300;
  display: inline-block;
  cursor: text;
`;

export const InputLabelFocus = styled.label`
  visibility: hidden;
  height: 0px;
  padding: 0px;
  margin: 0px;

  animation: ${labelAnimation} 0.2s ease-in 1;
`;
export const InputLabelError = styled.label`
  visibility: visible;
  font-size: 8pt;
  color: red;
  margin: 0px;
  padding: 0px;
`;
class Input extends React.Component {
  state = {
    focus: false,
    blurred: false,
    nextAn: false
  };

  handleFocus = e => {
    e.preventDefault();
    this.setState({ focus: true });
  };
  handleBlur = e => {
    e.preventDefault();
    this.setState({ blurred: true, nextAn: true });
  };
  changeAn = e => {
    e.preventDefault();
    this.setState({ nextAn: false });
  };
  render() {
    const { blurred, focus, changeAn } = this.state;
    const { handleFocus } = this;
    const { handleChange } = this.props;
    const validNoBlur = () => {
      return validate(this.props.value, this.props.type);
    };
    const validated = () => {
      if (blurred) {
        return validate(this.props.value, this.props.type);
      } else {
        return true;
      }
    };
    const Valid = validated();
    const InputFocus = styled.input`
      border-radius: 6px;
      border-bottom: ${!Valid ? "3px solid red" : "3px solid lightblue"};
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      outline: none;
      line-height: 25px;
      padding-bottom: 0px;
      margin: 2px;
      overflow: visible;
    `;
    return (
      <div style={{ margin: 0, padding: 0, marginLeft: 25 }}>
        {focus ? (
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
            {!focus ? (
              <Themes.InputLabel onClick={handleFocus}>
                {this.props.labelName}
              </Themes.InputLabel>
            ) : Valid ? (
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
        <InputFocus
          autoFocus={true}
          onBlur={this.handleBlur.bind(this)}
          type={this.props.type}
          name={this.props.name}
          onChange={handleChange.bind(this)}
          value={this.props.value}
          className="input"
          id={this.props.name}
          onFocus={handleFocus.bind(this)}
        />
        <span>
          {validNoBlur() ? (
            <img src={check2} style={{ height: 25, width: 25 }} />
          ) : (
            <img
              src={x}
              style={{
                width: 25,
                height: 25,
                visibility: Valid ? "hidden" : "visible"
              }}
            />
          )}
        </span>
      </div>
    );
  }
}

export default Input;
