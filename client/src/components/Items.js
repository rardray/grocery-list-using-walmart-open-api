import React from "react";

const Items = props => {
  return (
    <div key={props.id}>
      <h4>{props.title}</h4>
      <img src={props.image} style={{ height: 50, width: 50 }} />
    </div>
  );
};

export default Items;
