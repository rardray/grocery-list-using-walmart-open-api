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
    history: [],
    pageLoad: false,
    searchLoad: true
  };
  handleChange = formlogic.handleChange.bind(this);
  getRequest = httpRequests.getRequest.bind(this);
  putRequest = httpRequests.putRequest.bind(this);
  postRequest = httpRequests.postRequest.bind(this);
  deleteRequest = httpRequests.deleteRequest.bind(this);
  componentDidMount() {
    this.loadListAndHistory();
  }

  loadListAndHistory = () => {
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
        this.setState({
          groceryList: list.data,
          history: hist.data,
          pageLoad: true
        });
      })
    );
  };
  setUser = data => this.setState({ user: cookie.load("user") });

  setProductSearch = data => {
    let list = data.data.products;
    list.forEach(el => {
      return (el.count = 1);
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

  handleQuantity = (i, name, e) => {
    const n = this.state[name][i].count;
    const setCount = val => {
      this.setState(prevState => {
        return (prevState[name][i].count = val);
      });
    };
    if (e.target.name === "plus") {
      if (n === "0") {
        return setCount(1);
      } else {
        return setCount(n + 1);
      }
    }
    if (e.target.name === "minus") {
      if (n === "0") {
        return;
      } else {
        if (n === 1) {
          return setCount("0");
        } else {
          return setCount(n - 1);
        }
      }
    }
  };

  editList = (data, i) => {
    let { groceryList } = this.state;
    groceryList[i] = data.data;
    this.setState(prevState => {
      return {
        prevState: {
          ...prevState,
          gorceryList: groceryList
        }
      };
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

  addToList = (item, name) => {
    const data = { ...item };
    const count = data.count;
    const { groceryList } = this.state;
    if (data.count === "0") {
      return;
    }

    const getIndex = (index, value) => {
      for (let j = 0; j < index.length; j++) {
        if (index[j].id === value) return j;
      }
      return -1;
    };
    const matchingId = getIndex(groceryList, data.id);

    if (matchingId !== -1) {
      const newCount = groceryList[matchingId];
      newCount.count += count;

      this.putRequest(
        editListUrl,
        apiToken,
        newCount,
        this.editList,
        matchingId
      );
    } else {
      this.postRequest(postListUrl, apiToken, data, this.setPostListState);
      if (name !== "history") {
        this.postRequest(postHistUrl, apiToken, data, this.setPostHistState);
      }
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

  handleDrop = e => {
    let index = e.dataTransfer.getData("index");
    let name = e.dataTransfer.getData("name");
    let data = JSON.parse(index);
    this.addToList(data, name);
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
        clearList={this.clearList}
        pageLoad={this.state.pageLoad}
        searchLoad={this.state.searchLoad}
      />
    );
  }
}

export default AppContainer;
