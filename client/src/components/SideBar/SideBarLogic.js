import React, { useState } from "react";
import ListContainer from "./ListContainer";
import List from "./List";
import Loader from "../Loader";
import "../Styles/sidebar.css";

export default function SideBarLogic(props) {
  const [grocery, setGrocery] = useState(true);
  const handleColumn = e => {
    if (e.target.id === "top-links") {
      return;
    } else {
      setGrocery(!grocery);
    }
  };
  return (
    <div className="sidebar">
      <div className="r-contain">
        <div id="bar-header">
          <button
            id={grocery ? "top-links" : "top-unselected"}
            onClick={handleColumn}
          >
            Grocery List
          </button>
          <span />
          <button
            id={grocery ? "top-unselected" : "top-links"}
            onClick={handleColumn}
          >
            Favorites
          </button>
        </div>
        <ListContainer {...props} {...{ grocery }}>
          {" "}
          {props.pageLoad ? (
            <List
              {...props}
              {...{ grocery, handleColumn }}
              buttonLabel={grocery ? "R E M O V E " : "ADD TO CART"}
              filtervalue={grocery ? "inCart" : "favorite"}
              sortvalue={grocery ? "addedOn" : "updatedAt"}
              count={grocery ? "cartCount" : "count"}
            />
          ) : (
            <Loader />
          )}
        </ListContainer>
      </div>
    </div>
  );
}
