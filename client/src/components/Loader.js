import React from "react";
import "./Styles/main.css";

const Loader = props => {
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
        verticalAlign: "center",
        height: "100%",
        width: "100%"
      }}
    >
      <div className="spinner">
        <div id="sub-spin">
          <div id="sub-spin2">
            <div id="sub-spin3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
