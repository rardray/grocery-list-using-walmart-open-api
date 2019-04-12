import React, { useState } from "react";
import RegLogData from "./RegLogData";
const utility = require("./utility");

const Login = props => {
  const [error, setError] = useState("");
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
      setUser={props.setUser}
      getList={props.getList}
      setError={data => setError(data)}
      error={error ? <div style={{ color: "red" }}>{error}</div> : null}
    />
  );
};

export default Login;
