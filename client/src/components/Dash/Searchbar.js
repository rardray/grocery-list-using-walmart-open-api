import React, { useState } from "react";
import SearchIco from "../Styles/searchicon.svg";
import { navigate } from "@reach/router";
import { getRequest } from "../Utility/httpRequests";
import { searchURL, apiKeyGr } from "../Utility/appHelpers";

const Searchbar = props => {
  const [query, setQuery] = useState("");
  const searchSubmit = e => {
    e.preventDefault();
    getRequest(
      searchURL(query),
      apiKeyGr(),
      props.setProductSearches,
      navigate,
      "/grocery/search/" + query,
      setQuery("")
    );
  };

  return (
    <>
      <form
        style={{
          width: "100%",
          zIndex: 0,
          overflow: "hidden",
          margin: 0
        }}
        onSubmit={searchSubmit}
      >
        <input
          type="text"
          id="searchbar"
          onChange={e => setQuery(e.target.value)}
          name="query"
          value={query}
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
