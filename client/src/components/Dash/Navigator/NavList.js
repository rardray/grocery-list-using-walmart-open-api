import React from "react";
import { Link } from "@reach/router";
import { paths, titles } from "../../Utility/appHelpers";
import SubNavContainer from "./SubNavContainer";

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
        {i !== paths.length - 1 ? (
          <span style={{ color: "lightgrey", opacity: 0.1 }}>{" | "}</span>
        ) : null}
      </div>
    );
  }
  return (
    <div className="sub-nav">
      <SubNavContainer>
        <div style={{ padding: 2 }}>{links}</div>
      </SubNavContainer>
    </div>
  );
}
