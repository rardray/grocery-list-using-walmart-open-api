import React from "react";
import RegLogData from "./RegLogData";
const utility = require("./utility");

const Register = props => {
  return (
    <RegLogData
      state={{ firstName: "", lastName: "", email: "", password: "" }}
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
    />
  );
};

export default Register;
