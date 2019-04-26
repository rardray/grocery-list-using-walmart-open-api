import React from "react";
import SearchIco from "../Styles/searchicon.svg";

const Searchbar = props => {
  return (
    <>
      <form
        style={{
          width: "100%",
          zIndex: 0,
          overflow: "hidden",
          margin: 0
        }}
        onSubmit={props.searchSubmit}
      >
        <input
          type="text"
          id="searchbar"
          onChange={props.handleChange}
          name="query"
          value={props.query}
          style={{
            width: "100%",
            height: 20,
            border: "none",
            backgroundImage: `url(${SearchIco})`,

            textAlign: "left"
          }}
          placeholder="Search"
        />
      </form>
    </>
  );
};
export default Searchbar;
