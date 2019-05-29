import React from "react";
import H2 from "../H2";
import { Link } from "@reach/router";

export default function DefaultHome(props) {
  return (
    <div className="home" style={{ textAlign: "center" }}>
      <div>
        <H2 label={"Welcome To Fundrays Grocery App"} />
        <br />
        <span>Please </span>
        <Link to="grocery/login">Log In</Link>
        <span> or </span>

        <Link to="grocery/register">Register</Link>
      </div>
    </div>
  );
}
