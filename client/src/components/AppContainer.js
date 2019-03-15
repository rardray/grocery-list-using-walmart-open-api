import React from "react";
import { navigate } from "@reach/router";
import cookie from "react-cookies";
import Routes from "./Routes";
var httpRequests = require("./httpRequests");
var formlogic = require("./formlogic");

var searchURL = function(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search?offset=0&number=10&query=${id}`;
};
const apiKeyGr = { "X-RapidAPI-Key": cookie.load("grocery-api") };
const editListUrl = "/list/edit";
const postListUrl = "/list/post";
const apiToken = { Authorization: cookie.load("token") };

class AppContainer extends React.Component {
  state = {
    user: cookie.load("user") || "",
    query: "",
    productSearch: [],
    favorites: [],
    history: [],
    pageLoad: false,
    searchLoad: true,
    startPosition: 0,
    positionY: 0,
    mouseDown: false
  };
  handleChange = formlogic.handleChange.bind(this);
  getRequest = httpRequests.getRequest.bind(this);
  putRequest = httpRequests.putRequest.bind(this);
  postRequest = httpRequests.postRequest.bind(this);
  deleteRequest = httpRequests.deleteRequest.bind(this);
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    this.getRequest("/list", apiToken, this.listState);
  };
  listState = data => {
    this.setState({ history: data.data, pageLoad: true });
  };
  setUser = data => this.setState({ user: cookie.load("user") });

  setProductSearch = data => {
    let list = data.data.products;
    list.forEach(el => {
      return (
        (el.count = 1),
        (el.inCart = false),
        (el.cartCount = 1),
        (el.favorite = false)
      );
    });
    this.setState({ productSearch: list });
  };

  searchSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    this.getRequest(searchURL(query), apiKeyGr, this.setProductSearch, () =>
      navigate(`/search/${query}`, this.setState({ query: "" }))
    );
  };

  handleDelete = (data, e) => {
    data.inCart = false;
    data.cartCount = 0;
    this.putRequest(editListUrl, apiToken, data, this.getList);
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

  addToList = (item, name) => {
    const data = { ...item };
    data.inCart = true;
    const { history } = this.state;
    const filtered = history.filter(el => {
      return el.id === data.id;
    });
    if (filtered.length === 1) {
      data.cartCount += data.count;
      this.putRequest(editListUrl, apiToken, data, this.setList);
    } else {
      data.cartCount = data.count;
      this.postRequest(postListUrl, apiToken, data, this.setList);
    }
  };

  handleDrag = (data, name, e) => {
    let js = JSON.stringify(data);
    e.dataTransfer.setData("index", js);
    e.dataTransfer.setData("name", name);
    console.log(js);
  };

  onDragOver = e => {
    e.preventDefault();
  };
  handleMouseMove = e => {
    if (this.state.mouseDown) {
      let { startPosition, positionY } = this.state;
      let shift = e.clientY - startPosition;
      if (shift >= 0) {
        return this.setState({
          positionY: 0,
          startPosition: e.clientY - positionY
        });
      } else {
        this.setState({ positionY: shift });
      }
    }
  };
  handleScrollMsDown = e => {
    e.preventDefault();
    const { positionY } = this.state;
    this.setState({ startPosition: e.clientY - positionY, mouseDown: true });
  };
  handleMouseUp = e => {
    e.preventDefault();
    this.setState({ mouseDown: false });
  };
  handleDrop = e => {
    let index = e.dataTransfer.getData("index");
    let name = e.dataTransfer.getData("name");
    let data = JSON.parse(index);
    this.addToList(data, name);
  };
  setList = data => {
    this.setState({ history: data.data });
  };
  clearList = () => {
    console.log(this.state);
    this.putRequest("/list/remove", apiToken, null, this.setList);
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
        searchLoad={this.state.searchLoad}
        handleMouseUp={this.handleMouseUp}
        handleMouseMove={this.handleMouseMove}
        handleScrollMsDown={this.handleScrollMsDown}
        positionY={this.state.positionY}
      />
    );
  }
}

export default AppContainer;
