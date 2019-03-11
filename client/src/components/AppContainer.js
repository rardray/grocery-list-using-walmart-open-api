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
  componentDidMount() {
    const apiKey = cookie.load("token");
    axios
      .get("/list", {
        headers: { Authorization: apiKey }
      })
      .then(response => this.setState({ groceryList: response.data }))
      .then(() => console.log(this.state.groceryList));
  }
  setUser = data => this.setState({ user: data });
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
      if (productSearch[i].count === "0") {
        this.setState(prevState => {
          return (prevState.productSearch[i].count = 0);
        });
      }
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
          } else {
            this.setState(prevState => {
              return (prevState.productSearch[i].count -= 1);
            });
          }
        }
      }
    }
  };
  addToList = (i, e) => {
    const apiKey = cookie.load("token");
    const data = this.state.productSearch[i];
    const list = this.state.groceryList;
    function getIndex(index, value) {
      for (let i = 0; i < index.length; i++) {
        if (index[i].id === value) return i;
      }
      return -1;
    }
    let matchingId = getIndex(list, data.id);
    if (!data.count) {
      data.count = 1;
    }
    if (matchingId !== -1) {
      let newCount = this.state.groceryList[matchingId];
      newCount.count += data.count;
      axios
        .put("/list/edit", newCount, {
          headers: { Authorization: apiKey }
        })
        .then(response => {
          list[matchingId] = response.data;
          this.setState(prevState => {
            return (prevState.groceryList = list);
          });
        });
    } else {
      if (data.count === "0") {
        return;
      }
      axios
        .post("/list/post", data, {
          headers: { Authorization: apiKey }
        })
        .then(response => {
          if (!response.error) {
            this.setState(prevState => {
              return { groceryList: [...prevState.groceryList, data] };
            });
          }
        });
    }
  };

  handleDrag = (i, e) => {
    e.dataTransfer.setData("index", i);
  };
  onDragOver = e => {
    e.preventDefault();
  };
  handleDrop = e => {
    let index = e.dataTransfer.getData("index");
    this.addToList(index);
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
        groceryList={this.state.groceryList}
        addToList={this.addToList}
        handleDrag={this.handleDrag}
        onDragOver={this.onDragOver}
        handleDrop={this.handleDrop}
        setUser={this.setUser}
      />
    );
  }
}

export default AppContainer;
