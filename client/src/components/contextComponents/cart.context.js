import { createContext } from "react";

const CartContext = createContext({
  cart: [],
  getCart: () => {},
  clearAll: () => {},
  deleteOne: () => {},
  updateCart: () => {},
  clearCart: () => {}
});

export default CartContext;
