import React, { useState } from "react";
import RegLogData from "./RegLogData";
const utility = require("./utility");

const Register = props => {
  const [error, setError] = useState("");
  return (
    <>
      <RegLogData
        state={{
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }}
        url="/register"
        subheader="All inputs must be filled out.Password must contain at least one
          capitol letter and one numeral."
        header="REGISTER NEW ACCOUNT"
        label="S I G N  U P"
        types={utility.registerType}
        messages={utility.registerErrors}
        renderInputs={utility.renderInputs}
        setUser={props.setUser}
        getList={props.getList}
        setError={data => setError(data)}
        error={error ? <div style={{ color: "red" }}>{error}</div> : null}
      />
    </>
  );
};

export default Register;
