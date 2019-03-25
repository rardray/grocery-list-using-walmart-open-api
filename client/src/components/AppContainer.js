import React from "react";
import { navigate } from "@reach/router";
import cookie from "react-cookies";
import Routes from "./Routes";
import $ from "jquery";
import {
  apiKeyGr,
  apiToken,
  searchURL,
  editListUrl,
  postListUrl,
  findIndex
} from "./Utility/appHelpers";
var httpRequests = require("./Utility/httpRequests");
var formlogic = require("./Forms/formlogic");

class AppContainer extends React.Component {
  state = {
    user: cookie.load("user") || "",
    query: "",
    productSearch: [],
    history: [],
    pageLoad: false,
    window: false
  };
  handleChange = formlogic.handleChange.bind(this);
  getRequest = httpRequests.getRequest.bind(this);
  putRequest = httpRequests.putRequest.bind(this);
  postRequest = httpRequests.postRequest.bind(this);

  componentDidMount() {
    if (this.state.user) {
      this.getList();
    }
    window.addEventListener("deviceorientation", this.handleSidebar);
  }

  handleSidebar = e => {
    if ($(window).height() > $(window).width()) {
      return this.setState({ window: true });
    } else {
      this.setState({ window: false });
    }
  };
  getList = () => {
    this.getRequest("/api/list", apiToken(), this.listState);
  };
  listState = data => {
    this.setState({ history: data.data, pageLoad: true });
  };
  setUser = data => this.setState({ user: cookie.load("user") });
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
    this.setState({ productSearch: list });
  };

  searchSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    this.getRequest(searchURL(query), apiKeyGr(), this.setProductSearch, () =>
      navigate(`/grocery/search/${query}`, this.setState({ query: "" }))
    );
  };

  handleDelete = (data, e) => {
    data.inCart = false;
    data.cartCount = 0;
    this.putRequest(editListUrl, apiToken(), data, this.setList);
  };

  handleQuantity = (id, name, e) => {
    let i = findIndex(this.state[name], id);
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
    this.editData(data, i, this.putFavorite, this.postFavorite);
  };
  putFavorite = (data, i, history, id) => {
    this.putRequest(
      `/api/list/favorite/${id}`,
      apiToken(),
      data,
      this.setFavorite,
      i
    );
  };
  postFavorite = (data, i) => {
    this.postRequest(postListUrl, apiToken(), data, this.setPostFavorite, i);
  };
  editData = (data, ind, cb1, cb2) => {
    const { history } = this.state;
    const id = data.id;
    let k = findIndex(history, data);
    if (k || k === 0) {
      cb1(data, [ind, k], history, id);
    } else {
      cb2(data, [ind, k]);
    }
  };
  putUpdate = (data, i, history) => {
    data.cartCount = history[i[1]].cartCount + data.count;
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
    this.putRequest("/api/list/remove", apiToken(), null, this.setClearList);
  };
  setClearList = (data, i) => {
    if (!data.error) {
      const { history } = this.state;
      history.forEach(el => {
        el.cartCount = 0;
        el.inCart = false;
        return el;
      });
      this.setState({ history: history });
    }
  };
  render() {
    return <Routes {...this} {...this.state} />;
  }
}

export default AppContainer;
