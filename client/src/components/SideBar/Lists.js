import React from "react";
import Heart from "../ListPages/SharedStateless/Heart";
import Button from "../Button";
import H5 from "../H5";
import Span from "../Span";

export default function Lists(props) {
  return (
    <div key={props._id} className="list-block">
      <div style={{ height: 50 }}>
        <img src={props.image} alt={props.title} />
        <H5 label={props.title} />
        <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          margin: 0,
          boxSizing: "border-box"
        }}
      >
        <Button click={props.action} label={props.buttonLabel} />
        <Span>Quantity: {props.count} </Span>
      </div>
    </div>
  );
}
