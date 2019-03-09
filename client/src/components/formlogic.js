import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import { navigate } from "@reach/router";

export const handleChange = function(e) {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
};

export const handleSubmit = function(url, def, e) {
  e.preventDefault();
  const data = this.state;
  if (data.email) {
    data.email = data.email.toLowerCase();
  }
  axios
    .post("/auth" + url, data)
    .then(response => {
      if (!response.error) {
        cookie.save("user", response.data.user, { path: "/" });
        cookie.save("token", response.data.token, { path: "/" });
        this.setState(prevState => {
          return (prevState = def);
        });
        navigate("/");
      }
    })
    .catch(error => error);
};
