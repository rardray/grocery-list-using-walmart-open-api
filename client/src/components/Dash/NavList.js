import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

export default function NavList(props) {
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(window.location.pathname);
  });
  return (
    <div className="sub-nav">
      <div style={{ padding: 2 }}>
        <Link
          to="/grocery/addrecipe"
          className={
            path === "/grocery/addrecipe" ? "sub-links-selected" : "sub-links"
          }
        >
          new recipe
        </Link>{" "}
        |
        <Link
          to="/grocery/cart"
          className={
            path === "/grocery/cart" ? "sub-links-selected" : "sub-links"
          }
        >
          cart
        </Link>{" "}
        |
        <Link
          to="/"
          className={path === "/" ? "sub-links-selected" : "sub-links"}
        >
          home
        </Link>{" "}
        |
        <Link
          to="/grocery/favorites"
          className={
            path === "/grocery/favorites" ? "sub-links-selected" : "sub-links"
          }
        >
          favorites
        </Link>{" "}
        |
        <Link
          to="/grocery/history"
          className={
            path === "/grocery/history" ? "sub-links-selected" : "sub-links"
          }
        >
          history
        </Link>
      </div>
    </div>
  );
}
