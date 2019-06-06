import React, { useState } from "react";
import RegLogData from "./Forms/RegLogData";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
const utility = require("./Forms/utility");

const Register = props => {
  const [error, setError] = useState("");
  return (
    <>
      <ListWrapper>
        <RegLogData
          state={{
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
            password: "",
            newPassword: ""
          }}
          url="/update"
          subheader=""
          header="Change User Settings"
          label="Save Changes"
          types={utility.changeUserData}
          messages={utility.changeErrors}
          renderInputs={utility.renderInputs}
          setUser={props.setUser}
          getList={props.getList}
          setError={data => setError(data)}
          error={error ? <div style={{ color: "red" }}>{error}</div> : null}
        />
      </ListWrapper>
    </>
  );
};

export default Register;
