import axios from "axios";

export function getRequest(url, header, payLoad, redirect, path) {
  axios
    .get(url, {
      headers: header
    })
    .then(response => payLoad(response))
    .then(() => redirect(path))
    .catch(err => console.log(err));
}

export function putRequest(url, header, data, payload, vb, redirect) {
  axios
    .put(url, data, {
      headers: header
    })
    .then(response => payload(response, vb))
    .then(redirect)
    .catch(err => console.log(err));
}

export function postRequest(url, header, data, payload, vb, redirect) {
  axios
    .post(url, data, {
      headers: header
    })
    .then(response => {
      if (!response.error) {
        payload(response, vb);
      }
    })
    .then(redirect)
    .catch(err => console.log(err));
}

export function deleteRequest(url, header, payload, i) {
  axios
    .delete(url, {
      headers: header
    })
    .then(response => payload(response, i))
    .catch(error => error);
}
