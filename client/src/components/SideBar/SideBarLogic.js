import React, { useState, useContext } from "react";
import ThemesProvider from "../contextComponents/themes.context";
import ListContainer from "./ListContainer";
import List from "./List";
import BoxContainer from "../BoxContainer";
import Span from "../ThemedTags/Span";
import "../Styles/sidebar.css";

export default function SideBarLogic(props) {
  const [grocery, setGrocery] = useState(true);
  const { theme } = useContext(ThemesProvider);
  const handleColumn = e => {
    if (e.target.id === "top-links") {
      return;
    } else {
      setGrocery(!grocery);
    }
  };
  return (
    <div className="sidebar">
      <BoxContainer>
        <div id="bar-header">
          <button
            id={grocery ? "top-links" : "top-unselected"}
            style={{
              color: grocery ? theme.secondaryText : theme.primaryColor,
              transition: ".3s ease-in-out"
            }}
            onClick={handleColumn}
          >
            Grocery List
          </button>
          <Span />
          <button
            id={grocery ? "top-unselected" : "top-links"}
            onClick={handleColumn}
            style={{
              color: grocery ? theme.primaryColor : theme.secondaryText,
              transition: ".3s ease-in-out"
            }}
          >
            Favorites
          </button>
        </div>
        <ListContainer {...props} {...{ grocery }}>
          <List
            {...props}
            {...{ grocery, handleColumn }}
            filtervalue={grocery ? "cart" : "favorites"}
            count={"count"}
          />
        </ListContainer>
      </BoxContainer>
    </div>
  );
}
