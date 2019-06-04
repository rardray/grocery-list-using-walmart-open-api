import React from "react";
import H2 from "../ThemedTags/H2";
import { Link } from "@reach/router";
import Span from "../ThemedTags/Span";

export default function DefaultHome(props) {
  return (
    <div className="home" style={{ textAlign: "center" }}>
      <div>
        <H2 label={"Welcome To Fundrays Grocery App"} />
        <br />
        <Span>Please </Span>
        <Link to="grocery/login">Log In</Link>
        <Span> or </Span>

        <Link to="grocery/register">Register</Link>
      </div>
    </div>
  );
}
