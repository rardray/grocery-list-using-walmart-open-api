import styled, { keyframes } from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  display: block;
  position: sticky;
  top: 0px;
  min-height: 50px;
  max-height: 20%;
  background: black;
  color: white;
  z-index: 50;
  text-align: center;
`;

//INPUTS***********************************

const inputKeyframes = keyframes`
  0% {background: lightslategray; height: 2px; }
  100% {background: lightgrey; height: 22px;}`;

export const Input = styled.input`
  background: lightslategray;
  border-bottom: 1px solid slategray;
  padding: 0px;
  height: 2px;
`;
export const InputFocus = styled.input`
  animation: ${inputKeyframes} 0.2s ease-in-out 1;
`;

//commons//

//commons//

export const InputAfterBlur = styled.input``;
const errAnimation = keyframes`
  0% {border-bottom: 3px solid lightred; }
  100% { border-bottom: 3px solid darkred;}`;

export const InputError = styled.input`
  border-bottom: 3px solid red;
  animation: ${errAnimation} 1s ease-in-out infinite alternate;
`;

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
export const dark = {
  div: {
    background: "white",
    display: "inline-block",
    textAlign: "center",
    padding: 10,
    paddingBottom: 50,
    color: "slateblue",
    verticalAlign: "middle",
    maxWidth: "100%",
    minWidth: "75%",
    borderRadius: 10
  },
  h1: {
    fontSize: 14,
    fontFamily: "sans-serif"
  },
  input: {
    background: "none",
    borderBottom: "1px solid blue"
  },
  button: {
    background: "black",
    color: "white"
  },
  buttonHover: {
    background: "gray",
    color: "white",
    width: "50%",
    height: 30,
    margin: 4,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    animation:
      "0% {background: black;} 100% {background: white;} 1.2s ease-in 3"
  }
};
