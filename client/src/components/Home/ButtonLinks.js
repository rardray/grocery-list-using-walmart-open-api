import React from "react";
import { Link } from "@reach/router";

export default function ButtonLinks(props) {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        marginLeft: 10,
        marginRight: 10
      }}
    >
      <Link to={props.url}>
        <img
          src={props.image}
          alt={props.image}
          style={{ width: 25, height: 25, margin: 0 }}
        />
        <br />
        {props.label}
      </Link>
    </div>
  );
}
