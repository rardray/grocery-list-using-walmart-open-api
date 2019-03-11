import React from "react";
import axios from "axios";
import { Router, navigate } from "@reach/router";
import Items from "./Items";
import "./Styles/main.css";
import Button from "./Styles/Button";

const Search = props => {
  return (
    <div className="list-items">
      <h2>Search Results</h2>
      {props.productSearch.map((e, i) => {
        return (
          <div key={e.id}>
            <img
              src={e.image}
              draggable={true}
              onDragStart={props.handleDrag.bind(this, i)}
            />
            <h4>{e.title}</h4>
            <button onClick={props.addToList.bind(this, i)}>ADD TO LIST</button>
            <span>Quantity:</span>
            <button
              name="minus"
              id="minus"
              onClick={props.handleQuantity.bind(this, i)}
            >
              -
            </button>
            <span id="quantity"> {e.count || 1} </span>
            <button
              name="plus"
              id="minus"
              onClick={props.handleQuantity.bind(this, i)}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
