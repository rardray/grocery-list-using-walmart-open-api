import React from "react";
import Heart from "../ListPages/SharedStateless/Heart";
import Button from "../Button";
import H5 from "../H5";
import Span from "../Span";

export default function Lists(props) {
  return (
    <div key={props._id} className="list-block">
      <img src={props.image} alt={props.title} />
      <H5 label={props.title} />
      <Button click={props.action} label={props.buttonLabel} />
      <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
      <Span>Quantity: {props.count} </Span>
    </div>
  );
}
