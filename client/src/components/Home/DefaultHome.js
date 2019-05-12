import React from "react";
import { Link } from "@reach/router";

export default function DefaultHome(props) {
  return (
    <div className="home" style={{ textAlign: "center" }}>
      <div>
        <h2>Welcome To Fundrays Grocery App</h2>
        <br />
        <span>Please </span>
        <Link to="grocery/login">Log In</Link>
        <span> or </span>

        <Link to="grocery/register">Register</Link>
      </div>
    </div>
  );
}
