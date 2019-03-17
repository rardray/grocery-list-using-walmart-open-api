import React from "react";
import { navigate } from "@reach/router";
import cookie from "react-cookies";
import Routes from "./Routes";
var httpRequests = require("./httpRequests");
var formlogic = require("./formlogic");

const searchURL = function(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?offset=0&number=10&query=${id}`;
};
const apiKeyGr = function() {
  return { "X-RapidAPI-Key": cookie.load("grocery-api") };
};
const editListUrl = "/list/edit";
const postListUrl = "/list/post";
const apiToken = function() {
  return { Authorization: cookie.load("token") };
};

function findIndex(list, data) {
  for (let x = 0; x < list.length; x++) {
    if (list[x].id === data.id) {
      return x;
    }
  }
}
class AppContainer extends React.Component {
  state = {
    user: cookie.load("user") || "",
    query: "",
    productSearch: [],
    favorites: [],
    history: [],
    pageLoad: false,
    searchLoad: false
  };
  handleChange = formlogic.handleChange.bind(this);
  getRequest = httpRequests.getRequest.bind(this);
  putRequest = httpRequests.putRequest.bind(this);
  postRequest = httpRequests.postRequest.bind(this);
  deleteRequest = httpRequests.deleteRequest.bind(this);
  componentDidMount() {
    if (this.state.user) {
      this.getList();
    }
  }
  getList = () => {
    this.getRequest("/list", apiToken(), this.listState);
  };
  listState = data => {
    this.setState(
      { history: data.data, pageLoad: true },
      console.log(this.state.pageLoad)
    );
  };
  setUser = data =>
    this.setState({ user: cookie.load("user") }, console.log(this.state.user));
  logOutUser = () => {
    this.setState({ user: "" });
  };
  setProductSearch = data => {
    let list = data.data.products;
    const { history } = this.state;
    list.forEach(el => {
      for (let i = 0; i < history.length; i++) {
        if (el.id === history[i].id && history[i].favorite) {
          return (
            (el.favorite = true),
            (el.count = 1),
            (el.inCart = false),
            (el.cartCount = 0)
          );
        }
      }
      return (
        (el.count = 1),
        (el.inCart = false),
        (el.cartCount = 0),
        (el.favorite = false)
      );
    });
    this.setState({ productSearch: list }, console.log(list));
  };

  searchSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    this.getRequest(searchURL(query), apiKeyGr(), this.setProductSearch, () =>
      navigate(`/search/${query}`, this.setState({ query: "" }))
    );
  };

  handleDelete = (data, e) => {
    data.inCart = false;
    data.cartCount = 0;
    this.putRequest(editListUrl, apiToken(), data, this.setList);
  };

  handleQuantity = (i, name, e) => {
    const n = this.state[name][i].count;
    const setCount = val => {
      this.setState(prevState => {
        return (prevState[name][i].count = val);
      });
    };
    if (e.target.name === "plus") {
      return setCount(n + 1);
    }
    if (e.target.name === "minus") {
      if (n <= 1) {
        return;
      } else {
        return setCount(n - 1);
      }
    }
  };
  setFavorite = (data, i) => {
    const { productSearch, history } = this.state;
    history[i[1]] = data.data;
    if (
      productSearch.length > 0 &&
      productSearch[i[0]].id === history[i[1]].id
    ) {
      productSearch[i[0]].favorite = data.data.favorite;
    }
    this.setState({ history: history, productSearch: productSearch });
  };
  setPostFavorite = (data, i) => {
    const { productSearch, history } = this.state;
    productSearch[i[0]].favorite = data.data.favorite;
    history.unshift(data.data);
    this.setState(prevState => {
      return {
        productSearch: productSearch,
        history: history
      };
    });
  };

  addFavoriteFromSearch = (i, item) => {
    const data = { ...item };
    data.favorite = !data.favorite;
    console.log(data);
    this.editData(data, i, this.putFavorite, this.postFavorite);
  };
  putFavorite = (data, i, history, id) => {
    this.putRequest(
      `/list/favorite/${id}`,
      apiToken(),
      data,
      this.setFavorite,
      i
    );
  };
  postFavorite = (data, i) => {
    this.postRequest(postListUrl, apiToken, data, this.setPostFavorite, i);
  };
  editData = (data, ind, cb1, cb2) => {
    const { history } = this.state;
    const id = data.id;
    console.log(id);
    let k = findIndex(history, data);
    if (k || k === 0) {
      cb1(data, [ind, k], history, id);
    } else {
      cb2(data, [ind, k]);
    }
  };
  putUpdate = (data, i, history) => {
    data.cartCount = history[i[1]].cartCount + data.count;
    console.log(data);
    this.putRequest(editListUrl, apiToken(), data, this.setList, i[1]);
  };
  postUpdate = data => {
    data.cartCount = data.count;
    this.postRequest(postListUrl, apiToken(), data, this.postList);
  };
  addToList = (i, item) => {
    const data = { ...item };
    if (!data.inCart) {
      data.addedOn = Date.now();
      data.inCart = true;
    }
    this.editData(data, i, this.putUpdate, this.postUpdate);
  };
  postList = data => {
    const { history } = this.state;
    history.unshift(data.data);
    this.setState({ history: history });
  };
  handleDrag = (i, data, e) => {
    let js = JSON.stringify(data);
    e.dataTransfer.setData("index", js);
    e.dataTransfer.setData("i", i);
  };

  onDragOver = e => {
    e.preventDefault();
  };
  handleDrop = e => {
    let index = e.dataTransfer.getData("index");
    let data = JSON.parse(index);
    let i = e.dataTransfer.getData("i");
    this.addToList(i, data);
  };
  setList = (data, i) => {
    const { history } = this.state;
    history[i] = data.data;
    this.setState({ history: history });
  };
  clearList = () => {
    this.putRequest("/list/remove", apiToken(), null, this.setClearList);
  };
  setClearList = (data, i) => {
    if (!data.error) {
      const { history } = this.state;
      history.forEach(el => {
        return (el.cartCount = 0), (el.inCart = false);
      });
      this.setState({ history: history });
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
        addToList={this.addToList}
        handleDrag={this.handleDrag}
        onDragOver={this.onDragOver}
        handleDrop={this.handleDrop}
        setUser={this.setUser}
        handleDelete={this.handleDelete}
        history={this.state.history}
        clearList={this.clearList}
        pageLoad={this.state.pageLoad}
        addFavorite={this.addFavoriteFromSearch}
        addFavoriteFromSearch={this.addFavoriteFromSearch}
        logOutUser={this.logOutUser}
        getList={this.getList}
      />
    );
  }
}

export default AppContainer;