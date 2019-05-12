import React, { Component } from "react";
import HistoryProvider from "./contextComponents/HistoryProvider";
import CartProvider from "./contextComponents/CartProvider";
import FavoritesProvider from "./contextComponents/FavoritesProvider";
import AppContainer from "./AppContainer";
import "./Styles/lists.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FavoritesProvider>
          <CartProvider>
            <HistoryProvider>
              <AppContainer />
            </HistoryProvider>
          </CartProvider>
        </FavoritesProvider>
      </div>
    );
  }
}

export default App;
