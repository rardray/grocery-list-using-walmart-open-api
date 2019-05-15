import React, { useState, useContext } from "react";
import ProductSearchContext from "./productSearch.context";
import HistoryContext from "./history.context";

const ProductSearchProvider = ({ children }) => {
  const { getList } = useContext(HistoryContext);
  const getProductSearch = (data, favorites) => {
    setProductSearch(prevProductSearch => {
      let list = data.data.products;
      list.forEach(el => {
        el.count = 1;
        el.searchId = el.id;
        el.favorite = false;
        for (let i = 0; i < favorites.length; i++) {
          if (el.id === favorites[i].searchId && favorites[i].favorite) {
            return (el.favorite = true);
          }
        }
      });
      return { ...prevProductSearch, productSearch: [...list] };
    });
  };

  const setSearch = (data, i) => {
    setProductSearch(prevProductSearch => {
      let list = prevProductSearch.productSearch;
      list[i].favorite = data.data.favorite;
      return { ...prevProductSearch, productSearch: [...list] };
    });
    getList();
  };
  const addSearch = data =>
    setProductSearch(prevProductSearch => {
      return { ...prevProductSearch, productSearch: [...data] };
    });

  const prodDef = {
    productSearch: [],
    getProductSearch,
    setSearch,
    addSearch
  };
  const [productSearch, setProductSearch] = useState(prodDef);
  return (
    <ProductSearchContext.Provider value={productSearch}>
      {children}
    </ProductSearchContext.Provider>
  );
};

export default ProductSearchProvider;
