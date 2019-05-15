import { createContext } from "react";

const ProductSearchContext = createContext({
  productSearch: [],
  getProductSearch: () => {},
  setSearch: () => {},
  addSearch: () => {}
});

export default ProductSearchContext;
