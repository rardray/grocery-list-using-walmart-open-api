import React from "react";
import HistoryProvider from "./contextComponents/HistoryProvider";
import CartProvider from "./contextComponents/CartProvider";
import FavoritesProvider from "./contextComponents/FavoritesProvider";
import ProductSearchProvider from "./contextComponents/ProductSearchProvider";
import AppContainer from "./AppContainer";
import "./Styles/lists.css";

const App = function() {
  return (
    <div className="App">
      <FavoritesProvider>
        <CartProvider>
          <HistoryProvider>
            <ProductSearchProvider>
              <AppContainer />
            </ProductSearchProvider>
          </HistoryProvider>
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};

export default App;
