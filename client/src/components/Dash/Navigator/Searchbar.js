import React, { useState, useContext } from "react";
import SearchIco from "../../Styles/searchicon.svg";
import { navigate } from "@reach/router";
import axios from "axios";
import { searchURL, apiKeyGr } from "../../Utility/appHelpers";
import ProductSearchContext from "../../contextComponents/productSearch.context";
import FavoritesContext from "../../contextComponents/favorites.context";
import SearchContainer from "./SearchContainer";

const Searchbar = props => {
  const { getProductSearch } = useContext(ProductSearchContext);
  const { favorites } = useContext(FavoritesContext);
  const [query, setQuery] = useState("");
  const searchSubmit = e => {
    e.preventDefault();
    axios
      .get(searchURL(query), {
        headers: apiKeyGr()
      })
      .then(response => getProductSearch(response, favorites))
      .then(() => navigate("/grocery/search/" + query))
      .catch(err => err);

    setQuery("");
  };

  return (
    <>
      <SearchContainer>
        <form
          style={{
            width: "100%",
            zIndex: 0,
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
      </SearchContainer>
    </>
  );
};
export default Searchbar;
