import React from "react";

const Searchbar = props => {
  return (
    <form onSubmit={props.searchSubmit}>
      <input
        type="text"
        onChange={props.handleChange}
        name="query"
        value={props.query}
        style={{
          width: "20%",
          height: 20,
          float: "right",
          border: "none",
          marginTop: 10
        }}
        placeholder="Search"
      />
    </form>
  );
};
export default Searchbar;
