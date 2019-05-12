import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  getCart: () => {},
  clearAll: () => {},
  deleteOne: () => {},
  updateCart: () => {}
});

export default CartContext;
