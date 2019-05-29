import React, { useState } from "react";
import Heart from "./Heart";
import BoxContainer from "../../BoxContainer";
import Button from "../../Button";
import H4 from "../../H4";
import Span from "../../Span";

const Items = props => {
  const [deletion, setDelete] = useState(false);
  return (
    <BoxContainer
      class="list-block"
      key={props.id}
      id={props.id}
      additionalStyles={{
        marginTop: 0,
        marginBottom: deletion ? 0 : 10,
        height: deletion ? 0 : 123,
        opacity: deletion ? 0 : 1,
        transition: "0.3s ease-in-out"
      }}
    >
      <div style={{ display: "block", marginBottom: 34, minHeight: 65 }}>
        <img
          src={props.image}
          alt="missing"
          draggable={true}
          onDragStart={props.handleDrag}
        />
        <H4 label={props.title} />
      </div>
      <div
        style={{
          display: "block",
          position: "absolute",
          bottom: 6,
          right: 0,
          width: "100%",
          textAlign: "right",
          boxSizing: "border-box",
          borderTop: "1px solid #0c3450"
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "relative",
            verticalAlign: "middle"
          }}
        >
          <div
            onClick={props.del ? () => setDelete(true) : null}
            style={{ display: "inline-block" }}
          >
            <Button click={props.action} label={props.bLabel} />
          </div>
          <Span style={{ marginLeft: 15 }}>Quantity:</Span>
          <button name="minus" className="minus" onClick={props.handleQuantity}>
            -
          </button>

          <Span className="quantity"> {props.count} </Span>
          <button name="plus" className="minus" onClick={props.handleQuantity}>
            +
          </button>
          <div
            onClick={props.fav ? () => setDelete(true) : null}
            style={{ display: "inline-block" }}
          >
            <Heart addFavorite={props.addFavorite} favorite={props.favorite} />
          </div>
        </div>
      </div>
    </BoxContainer>
  );
};

export default Items;
