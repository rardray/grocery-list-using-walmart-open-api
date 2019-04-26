import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { paths, titles } from "../Utility/appHelpers";

export default function NavList(props) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(window.location.pathname);
  });

  let links = [];
  for (let i = 0; i < paths.length; i++) {
    links[i] = (
      <Link
        key={i}
        to={paths[i]}
        className={path === paths[i] ? "sub-links-selected" : "sub-links"}
      >
        {titles[i]}
      </Link>
    );
  }
  return (
    <div className="sub-nav">
      <div style={{ padding: 2 }}>{links}</div>
    </div>
  );
}
