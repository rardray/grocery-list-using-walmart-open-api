import {
  postRequest,
  putRequest,
  deleteRequest
} from "../Utility/httpRequests";
import { postListUrl, apiToken } from "../Utility/appHelpers";

export const addToList = (i, item, user, callback) => {
  const data = { ...item, userId: user._id };
  postRequest(postListUrl, apiToken(), data, callback, i);
};

export const clearList = (user, callback) => {
  let id = user._id;
  deleteRequest("/api/cart/clearall/" + id, apiToken(), callback);
};

export const handleDelete = (i, data, callback) => {
  const id = data._id;
  deleteRequest(`/api/cart/clearone/${id}`, apiToken(), callback, i);
};

export const addFavoriteFromSearch = (i, item, user, callback) => {
  const data = { ...item, userId: user._id };
  data.favorite = !data.favorite;
  postRequest("/api/list/favorite", apiToken(), data, callback, i);
};

export const handleQuantity = (i, value, callback, history, cb2, e) => {
  let newobj = history;
  if (e.target.name === "plus") {
    newobj[i].count = value + 1;
  } else {
    if (value === 1) {
      return;
    }
    newobj[i].count = value - 1;
  }
  return callback(newobj, i, cb2);
};

export const updateCartCount = (data, i, callback) => {
  let obj = data[i];
  let id = obj._id;
  putRequest("/api/cart/update/" + id, apiToken(), obj, callback, i);
};
