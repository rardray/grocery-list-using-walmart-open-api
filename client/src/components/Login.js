import React from "react";
import "./Styles/main.css";
import RegLogData from "./RegLogData";
const utility = require("./utility");

const Login = props => {
  return (
    <RegLogData
      state={{ email: "", password: "" }}
      url="/login"
      subheader="All inputs must be filled out.Password must contain at least one
          capitol letter and one numeral."
      header="LOG IN"
      label="L O G  I N"
      types={utility.loginType}
      messages={utility.loginErrors}
      renderInputs={utility.renderInputs}
    />
  );
};

export default Login;
