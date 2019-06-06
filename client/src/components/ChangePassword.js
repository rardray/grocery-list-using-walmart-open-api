import React, { useState } from "react";
import RegLogData from "./Forms/RegLogData";
import ListWrapper from "./ListPages/SharedStateless/ListWrapper";
const utility = require("./Forms/utility");

const ChangePassword = props => {
  const [error, setError] = useState("");
  return (
    <>
      <ListWrapper>
        <RegLogData
          state={{
            password: "",
            newPassword: ""
          }}
          url="/changepassword"
          subheader=""
          header="Change Password"
          label="Save Changes"
          types={utility.changeUserPassword}
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

export default ChangePassword;
