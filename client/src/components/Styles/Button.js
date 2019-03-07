import React from "react";
import "./main.css";
import styled, { keyframes, css } from "styled-components";
var Themes = require("./Themes");
class Button extends React.Component {
  state = {
    hover: false
  };
  hover = () => {
    this.setState({ hover: !this.state.hover });
  };
  render() {
    const { theme, label, hover } = this.props;
    return (
      <div>
        {this.state.hover ? (
          <Themes.ButtonHover
            onMouseLeave={this.hover}
            onClick={this.props.click}
          >
            {label}
          </Themes.ButtonHover>
        ) : (
          <Themes.Button onMouseEnter={this.hover}>{label}</Themes.Button>
        )}
      </div>
    );
  }
}

export default Button;
