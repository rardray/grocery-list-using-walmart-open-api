import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import cookie from "react-cookies";
import Routes from "./Routes";
var formlogic = require("./formlogic");

class AppContainer extends React.Component {
  state = {
    user: cookie.load("user") || "",
    query: "",
    productSearch: [],
    groceryList: [],
    favorites: [],
    history: []
  };
  handleChange = formlogic.handleChange.bind(this);

  searchSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    const apiKey = cookie.load("grocery-api");
    axios
      .get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?offset=0&number=10&query=${query}`,
        {
          headers: {
            "X-RapidAPI-Key": apiKey
          }
        }
      )
      .then(response =>
        this.setState({ productSearch: response.data.products })
      )
      .then(() => navigate(`/search/${query}`, this.setState({ query: "" })))
      .catch(err => console.log(err));
  };

  handleQuantity = (i, e) => {
    const { productSearch } = this.state;
    if (e.target.name === "plus") {
      if (productSearch[i].count) {
        this.setState(prevState => {
          return (prevState.productSearch[i].count += 1);
        });
      } else {
        this.setState(prevState => {
          return (prevState.productSearch[i].count = 2);
        });
      }
    }
    if (e.target.name === "minus") {
      if (productSearch[i].count) {
        if (productSearch[i].count === "0") {
          return;
        } else {
          if (productSearch[i].count === 1) {
            this.setState(prevState => {
              return (prevState.productSearch[i].count = "0");
            });
          }
          this.setState(prevState => {
            return (prevState.productSearch[i].count -= 1);
          });
        }
      }
    }
  };
  render() {
    return (
      <Routes
        handleChange={this.handleChange}
        searchSubmit={this.searchSubmit}
        productSearch={this.state.productSearch}
        query={this.state.query}
        user={this.state.user}
        handleQuantity={this.handleQuantity}
      />
    );
  }
}

export default AppContainer;
