import React from "react";
import Heart from "../ListPages/SharedStateless/Heart";
import Button from "../Button";

export default function Lists(props) {
  return (
    <div key={props._id} className="list-block">
      <img src={props.image} alt={props.title} />
      <h5>{props.title}</h5>
      <Button click={props.action} label={props.buttonLabel} />
      <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
      <span>Quantity: {props.count} </span>
    </div>
  );
}
