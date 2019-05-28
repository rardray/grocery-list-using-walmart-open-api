import React from "react";
import { Link } from "@reach/router";
import { paths, titles, SB_AD } from "../../Utility/appHelpers";

export default function Footer(props) {
  let links = [];
  let logout = (
    <p
      style={{ cursor: "pointer", display: "inline-block" }}
      onClick={props.handleLogout}
      key={paths.length + 1}
    >
      log out
    </p>
  );
  for (let i = 0; i < paths.length; i++) {
    links[i] = (
      <div key={i} style={{ display: "inline-block" }}>
        <Link to={paths[i]}>{titles[i]}</Link> {" | "}
      </div>
    );
  }
  links.push(logout);
  return (
    <div className="footer">
      {props.user ? (
        <>{links}</>
      ) : (
        <>
          <Link to={`${SB_AD}/login`}>Log in</Link>
          {" | "}
          <Link to={`${SB_AD}/register`}>Register</Link>
        </>
      )}
      <br />
      <p>Copyright (c) 2019 Ryan Ardray under MIT License. Version 0.6.7</p>
    </div>
  );
}
