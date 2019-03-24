import React, { useState } from "react";
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

export default function Button(props) {
  const [hover, setHover] = useState(false);
  const { label, click } = props;
  const Btn = styled.button`
    background: ${hover ? "grey" : "slategrey"};
    color: white;
    animation: ${hover ? animation : "none"};
  `;
  return (
    <div>
      <Btn
        style={{ zIndex: 15 }}
        onMouseLeave={() => setHover(!hover)}
        onMouseEnter={() => setHover(!hover)}
        onClick={click}
      >
        {label}
      </Btn>
    </div>
  );
}
