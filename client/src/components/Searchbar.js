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
            width: "20%",
            height: 20,
            float: "right",
            border: "none",
            marginTop: 10
          }}
          placeholder="Search"
        />
      </form>
    </div>
  );
};
export default Searchbar;
