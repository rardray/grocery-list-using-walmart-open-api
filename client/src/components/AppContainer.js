import React from "react";
import axios from "axios";
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
const postHistUrl = "/history/post";
const deleteOneListUrl = function(id) {
  return `/list/delete/${id}`;
};
const deleteListUrl = "/list/clear";
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
  getRequest = httpRequests.getRequest.bind(this);
  putRequest = httpRequests.putRequest.bind(this);
  postRequest = httpRequests.postRequest.bind(this);
  deleteRequest = httpRequests.deleteRequest.bind(this);
  componentDidMount() {
    function getList() {
      return axios.get("/list", {
        headers: apiToken
      });
    }
    function getHistory() {
      return axios.get("/history", {
        headers: apiToken
      });
    }
    axios.all([getList(), getHistory()]).then(
      axios.spread((list, hist) => {
        this.setState({ groceryList: list.data, history: hist.data });
      })
    );
  }

  setUser = data => this.setState({ user: cookie.load("user") });
  setProductSearch = data => {
    this.setState({ productSearch: data.data.products });
  };
  searchSubmit = e => {
    e.preventDefault();
    const query = this.state.query;
    this.getRequest(searchURL(query), apiKeyGr, this.setProductSearch, () =>
      navigate(`/search/${query}`, this.setState({ query: "" }))
    );
  };
  setDeleteItemState = data => {
    let newState = this.state.groceryList.filter(el => {
      return data.data.id !== el.id;
    });
    this.setState({ groceryList: newState });
  };

  handleDelete = (val, e) => {
    const id = val;
    this.deleteRequest(deleteOneListUrl(id), apiToken, this.setDeleteItemState);
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
  editList = (data, i) => {
    let list = this.state.groceryList;
    list[i] = data.data;
    this.setState(prevState => {
      return (prevState.groceryList = list);
    });
  };
  setPostListState = data =>
    this.setState(prevState => {
      return { groceryList: [...prevState.groceryList, data] };
    });
  setPostHistState = data =>
    this.setState(prevState => {
      return { history: [...prevState.history, data] };
    });
  addToList = (i, name, e) => {
    const data =
      name === "history" ? this.state.history[i] : this.state.productSearch[i];
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
      this.putRequest(
        editListUrl,
        apiToken,
        newCount,
        this.editList,
        matchingId
      );
    } else {
      if (data.count === "0") {
        return;
      }
      this.postRequest(postListUrl, apiToken, data, this.setPostListState);
      if (name !== "history") {
        this.postRequest(postHistUrl, apiToken, data, this.setPostHistState);
      }
    }
  };
  historyCount = (i, e) => {
    if (e.target.name === "plus") {
      this.setState(prevState => {
        return (prevState.history[i].count += 1);
      });
    }
    if (e.target.name === "minus") {
      if (e.target.value === 1) {
        return;
      } else {
        this.setState(prevState => {
          return (prevState.history[i].count -= 1);
        });
      }
    }
  };
  handleDrag = (i, name, e) => {
    e.dataTransfer.setData("index", i);
    e.dataTransfer.setData("name", name);
  };
  onDragOver = e => {
    e.preventDefault();
  };
  handleDrop = e => {
    let index = e.dataTransfer.getData("index");
    let name = e.dataTransfer.getData("name");
    this.addToList(index, name);
  };
  setClearList = data => {
    if (!data.error) {
      this.setState({ groceryList: [] });
    }
  };
  clearList = () => {
    this.deleteRequest(deleteListUrl, apiToken, this.setClearList);
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
        handleDelete={this.handleDelete}
        history={this.state.history}
        historyCount={this.historyCount}
        clearList={this.clearList}
      />
    );
  }
}

export default AppContainer;
