import React from "react";
import axios from "axios";
import { Router, navigate } from "@reach/router";
import Items from "./Items";
import "./Styles/main.css";
import Button from "./Styles/Button";

const Search = props => {
  const sTitle = window.location.pathname.slice(8).replace("%20", " ");
  return (
    <div className="list-items">
      <h2>Search Results for {sTitle}</h2>
      {props.productSearch.length ? null : (
        <h4>
          Sorry, search returned no results. Try broadening your search query.
        </h4>
      )}
      {props.productSearch.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <Items
              id={el.id}
              image={el.image}
              handleDrag={props.handleDrag.bind(this, el, "productSearch")}
              title={el.title}
              addToList={props.addToList.bind(this, el, "productSearch")}
              handleQuantity={props.handleQuantity.bind(
                this,
                i,
                "productSearch"
              )}
              count={el.count}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Search;
