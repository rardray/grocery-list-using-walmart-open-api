import React from "react";
import { navigate } from "@reach/router";
import { paths } from "../Utility/appHelpers";

export default function BackButton(props) {
  const handleClick = () => {
    if (props.path.includes("/recipe")) {
      navigate(paths[2]);
    } else {
      window.history.back();
    }
  };
  return (
    <>
      {paths.indexOf(props.path) === -1 ? (
        <div
          style={{ position: "fixed", top: 50, left: 10, cursor: "pointer" }}
        >
          <div
            onClick={handleClick}
            style={{
              fontFamily: "sans-serif",
              fontWeight: 900,
              fontSize: "2em"
            }}
          >
            {"<"}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
