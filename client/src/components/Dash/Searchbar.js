import React from "react";

const Searchbar = props => {
  return (
    <>
      <form
        style={{
          minWidth: "80%",
          maxWidth: "95%",
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
            maxWidth: "100%",
            minWidth: "90%",
            height: 20,
            border: "none",

            textAlign: "left"
          }}
          placeholder="Search"
        />
      </form>
    </>
  );
};
export default Searchbar;
