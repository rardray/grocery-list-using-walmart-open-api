import React from "react";

const Searchbar = props => {
  return (
    <div>
      <form
        style={{
          margin: 0,
          padding: 0,
          paddingTop: 10,
          display: "inline-block",
          position: "relative",
          minWidth: "40%",
          maxWidth: "90%",
          textAlign: "center"
        }}
        onSubmit={props.searchSubmit}
      >
        <input
          type="text"
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
    </div>
  );
};
export default Searchbar;
