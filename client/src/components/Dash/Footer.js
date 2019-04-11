import React from "react";
import { Link } from "@reach/router";

export default function Footer(props) {
  return (
    <div className="footer">
      {props.user ? (
        <>
          {" "}
          <Link to="grocery/favorites">Favorites</Link>
          {" | "}
          <Link to="grocery/history">History</Link>
          {" | "}
          <Link to="grocery/addrecipe">Add Recipe</Link>
          {" | "}
          <Link to="/">Home</Link>
          {" | "}
          <Link to="grocery/history">Log Out</Link>
        </>
      ) : (
        <>
          <Link to="grocery/login">Log in</Link>
          {" | "}
          <Link to="grocery/register">Register</Link>
        </>
      )}
      <br />
      <p>Copyright (c) 2019 Ryan Ardray under MIT License. Version 0.3.4</p>
    </div>
  );
}
