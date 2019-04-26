import React from "react";
import { Link } from "@reach/router";
import { paths, titles } from "../Utility/appHelpers";

export default function NavList(props) {
  let links = [];
  for (let i = 0; i < paths.length; i++) {
    links[i] = (
      <>
        <Link
          key={i}
          to={paths[i]}
          className={
            props.path === paths[i] ? "sub-links-selected" : "sub-links"
          }
        >
          {titles[i]}
        </Link>
        {i !== paths.length - 1 ? " | " : null}
      </>
    );
  }
  return (
    <div className="sub-nav">
      <div style={{ padding: 2 }}>{links}</div>
    </div>
  );
}
