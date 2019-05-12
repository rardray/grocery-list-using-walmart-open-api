import React, { useState } from "react";
import CartContext from "./cart.context";
import { getRequest } from "../Utility/httpRequests";
import { apiToken } from "../Utility/appHelpers";
import cookie from "react-cookies";

const CartProvider = ({ children }) => {
  const clearAll = () =>
    setCart(prevCart => {
      return { ...prevCart, cart: [] };
    });

  const deleteOne = (data, i) => {
    setCart(prevCart => {
      let obj = prevCart.cart.filter(el => {
        return el !== prevCart.cart[i];
      });
      return { ...prevCart, cart: obj };
    });
  };
  const updateCart = (data, i) => {
    setCart(prevCart => {
      let obj = prevCart.cart;
      obj[i] = data.data;
      return { ...prevCart, cart: [...obj] };
    });
  };
  const getCart = () => {
    let user = cookie.load("user");
    getRequest(
      "/api/cart/" + user._id,
      apiToken(),
      data =>
        setCart(prevCart => {
          return { ...prevCart, cart: [...data.data] };
        }),
      () => {}
    );
  };
  const cartDef = {
    cart: [],
    updateCart,
    getCart,
    deleteOne,
    clearAll
  };
  const [cart, setCart] = useState(cartDef);
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export default CartProvider;
