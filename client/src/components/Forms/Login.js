import React, { useState, useContext } from "react";
import RegLogData from "./RegLogData";
import HistoryContext from "../contextComponents/history.context";
const utility = require("./utility");

const Login = props => {
  const [error, setError] = useState("");
  const { getList } = useContext(HistoryContext);
  return (
    <RegLogData
      state={{ email: "", password: "" }}
      url="/login"
      subheader="All inputs must be filled out.Password must contain at least one
          capitol letter and one numeral."
      header="Log In"
      label="Log In"
      types={utility.loginType}
      messages={utility.loginErrors}
      renderInputs={utility.renderInputs}
      setUser={props.setUser}
      getList={getList}
      setError={data => setError(data)}
      error={error ? <div style={{ color: "red" }}>{error}</div> : null}
    />
  );
};

export default Login;
