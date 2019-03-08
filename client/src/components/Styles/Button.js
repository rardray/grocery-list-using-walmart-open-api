import React from "react";
import "./main.css";
import styled, { keyframes, css } from "styled-components";

const highlight = keyframes`
  0% { background: black; }
  100% { background: grey; }
  `;
const animation = props =>
  css`
    ${highlight} .3s ease-in-out 1;
  `;
class Button extends React.Component {
  state = {
    hover: false
  };
  hover = () => {
    this.setState({ hover: !this.state.hover });
  };
  render() {
    const { label } = this.props;
    const Btn = styled.button`
      background: ${this.state.hover ? "grey" : "slategrey"};
      color: white;
      animation: ${this.state.hover ? animation : "none"};
    `;
    return (
      <div>
        <Btn
          onMouseLeave={this.hover.bind(this)}
          onMouseEnter={this.hover.bind(this)}
        >
          {label}
        </Btn>
      </div>
    );
  }
}

export default Button;
