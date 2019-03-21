import React from "react";

const Searchbar = props => {
  return (
    <div>
      <form
        style={{
          padding: 0,
          paddingTop: 10,
          margin: "auto",
          position: "relative",
          minWidth: "40%",
          maxWidth: "60%",
          textAlign: "center",
          zIndex: 0
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
