import React from "react";
import { Link } from "@reach/router";
import LinkWrap from "./LinkWrap";

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
      <LinkWrap>
        <Link to={props.url} style={{ color: "inherit" }}>
          <img
            src={props.image}
            alt={props.image}
            style={{ width: 25, height: 25, margin: 0 }}
          />
          <br />
          {props.label}
        </Link>
      </LinkWrap>
    </div>
  );
}
