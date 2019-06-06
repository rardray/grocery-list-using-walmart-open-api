import React from "react";
import Input from "./Input";

//login register texts
export const registerType = ["text", "text", "email", "password"];
export const changeUserData = ["text", "text", "email", "password", "password"];
export const registerErrors = [
  "First Name Cannot Be Left Blank",
  "Last Name Cannot Be Left Blank",
  "Must Be a Valid Email Address EX: user@example.org",
  "Password Must Contain At Least one Upper Case and One Number"
];

export const changeErrors = [
  "First Name Cannot Be Left Blank",
  "Last Name Cannot Be Left Blank",
  "Must Be a Valid Email Address EX: user@example.org",
  "Password Must Contain At Least one Upper Case and One Number",
  "Password Must Contain At Least one Upper Case and One Number"
];
export const loginType = ["email", "password"];
export const loginErrors = [
  "Please Provide a Valid Email Address",
  "Password Must Contain At Least one Upper Case and One Number"
];

export const renderInputs = function(state, ty, msg) {
  let keys = Object.keys(state);
  let regx = /([a-z]+)([A-Z][a-z]+)/;
  let value = [];
  for (let i = 0; i < keys.length; i++) {
    let n = keys[i].replace(regx, "$1 $2");
    value[i] = (
      <Input
        key={`${keys[i]}${i}`}
        name={keys[i]}
        value={state[keys[i]]}
        type={ty[i]}
        handleChange={this.handleChange}
        label={true}
        labelName={n.charAt(0).toUpperCase() + n.slice(1)}
        errorMessage={msg[i]}
        validation={true}
      />
    );
  }
  return value;
};
