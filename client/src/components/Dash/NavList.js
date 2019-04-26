import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const SB_AD = "/grocery";
const paths = [
  `${SB_AD}/addrecipe`,
  `${SB_AD}/cart`,
  "/",
  `${SB_AD}/favorites`,
  `${SB_AD}/history`
];
const titles = ["new recipe", "cart", "home", "favorites", "history"];

export default function NavList(props) {
  const [path, setPath] = useState("/");
  const [pInd, setInd] = useState(0);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setPath(window.location.pathname);
  });
  useEffect(() => {
    setInd(paths.indexOf(path));
  });
  useEffect(() => {
    setToggle(!toggle);
    console.log(toggle);
  }, [path]);
  return (
    <div className="sub-nav">
      <div style={{ padding: 2 }}>
        <Link
          to={pInd < 2 ? paths[pInd + 3] : paths[pInd - 2]}
          className={"sub-links"}
        >
          {pInd < 2 ? titles[pInd + 3] : titles[pInd - 2]}
        </Link>{" "}
        |
        <Link
          to={pInd < 1 ? paths[pInd + 4] : paths[pInd - 1]}
          className={toggle ? "sub-links-in" : "sub-links-in2"}
        >
          {pInd < 1 ? titles[pInd + 4] : titles[pInd - 1]}
        </Link>{" "}
        |
        <Link
          to={path}
          className={toggle ? "sub-links-selected" : "sub-links-selected2"}
        >
          {titles[pInd]}
        </Link>{" "}
        |
        <Link
          to={pInd > 3 ? paths[pInd - 4] : paths[pInd + 1]}
          className={toggle ? "sub-links-in" : "sub-links-in2"}
        >
          {pInd > 3 ? titles[pInd - 4] : titles[pInd + 1]}
        </Link>{" "}
        |
        <Link
          to={pInd > 2 ? paths[pInd - 3] : paths[pInd + 2]}
          className={"sub-links"}
        >
          {pInd > 2 ? titles[pInd - 3] : titles[pInd + 2]}
        </Link>
      </div>
    </div>
  );
}

/*
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
*/
