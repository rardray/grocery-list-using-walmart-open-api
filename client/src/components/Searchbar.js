import React from "react";

const Searchbar = props => {
  return (
    <div>
      <form onSubmit={props.searchSubmit}>
        <input
          type="text"
          onChange={props.handleChange}
          name="query"
          value={props.query}
          style={{
            maxWidth: "40%",
            minWidth: "15%",
            height: 20,
            border: "none",
            marginTop: 10,
            display: "inline-block",
            position: "relative",

            textAlign: "left"
          }}
          placeholder="Search"
        />
      </form>
    </div>
  );
};
export default Searchbar;
