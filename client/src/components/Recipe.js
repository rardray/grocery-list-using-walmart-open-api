import React, { useState, useEffect, useContext } from "react";
import { getRequest } from "./Utility/httpRequests";
import { apiToken } from "./Utility/appHelpers";
import "./Styles/recipe.css";
import RecipeRender from "./RecipeRender";
import { useLoaderState } from "./Hooks";
import CartContext from "./contextComponents/cart.context";
import HistoryContext from "./contextComponents/history.context";

export default function Recipe(props) {
  const { cart, getCart } = useContext(CartContext);
  const { getList } = useContext(HistoryContext);
  const [state, setState] = useState({
    title: "",
    instructions: "",
    ingredients: [],
    image: ""
  });

  const load = useLoaderState(
    getRequest,
    `/api/recipe/one/${props.id}`,
    apiToken(),
    data => {
      setState({ ...data.data });
    }
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, {});

  const { title, instructions, ingredients, image } = state;
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        marginBottom: 125,
        marginTop: 40
      }}
    >
      <RecipeRender
        {...{ title, instructions, ingredients, image }}
        device={props.device}
        cart={cart}
        getList={getList}
        getCart={getCart}
        user={props.user}
        load={load}
      />
    </div>
  );
}
