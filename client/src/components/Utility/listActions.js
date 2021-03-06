import { postRequest, putRequest, deleteRequest } from "./httpRequests";
import { postListUrl, apiToken } from "./appHelpers";

export const addToList = (i, item, callback) => {
  const data = { ...item };
  postRequest(postListUrl, apiToken(), data, callback, i);
};

export const clearList = (callback, id) => {
  deleteRequest("/api/cart/clearall/" + id, apiToken(), callback);
};

export const handleDelete = (i, data, callback) => {
  const id = data._id;
  deleteRequest(`/api/cart/clearone/${id}`, apiToken(), callback, i);
};

export const addFavoriteFromSearch = (i, item, callback) => {
  const data = { ...item };
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

export const deleteCaldata = (nav, data, callback) => {
  const id = data._id;
  deleteRequest(`/api/caldata/delete/${id}`, apiToken(), callback, nav);
};
