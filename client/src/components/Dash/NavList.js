import React from "react";
import { Link } from "@reach/router";
import { paths, titles } from "../Utility/appHelpers";

export default function NavList(props) {
  let links = [];
  for (let i = 0; i < paths.length; i++) {
    links[i] = (
      <div key={i} style={{ display: "inline-block" }}>
        <Link
          to={paths[i]}
          className={
            props.path === paths[i]
              ? "sub-links sub-links-selected"
              : "sub-links"
          }
        >
          {titles[i]}
        </Link>
        {i !== paths.length - 1 ? " | " : null}
      </div>
    );
  }
  return (
    <div className="sub-nav">
      <div style={{ padding: 2 }}>{links}</div>
    </div>
  );
}
