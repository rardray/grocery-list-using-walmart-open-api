import axios from "axios";
import cookie from "react-cookies";
import { navigate } from "@reach/router";
import { apiToken } from "../Utility/appHelpers";

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
  let user = cookie.load("user");
  const data = this.state;
  if (data.email) {
    data.email = data.email.toLowerCase();
  }
  if (url === "/update") {
    let newData = { ...data, _id: user._id };
    return axios
      .put("/api/auth" + url, newData, {
        headers: apiToken()
      })
      .then(response => {
        if (!response.error) {
          cookie.save("user", response.data, { path: "/" });
        }
      })
      .then(() => this.props.setUser())
      .then(() => navigate("/grocery/settings"));
  }
  if (url === "/changepassword") {
    let pwordData = { ...data, _id: user._id };
    return axios.put("/api/auth" + url, pwordData).then(response => {
      if (!response.error) {
        navigate("/grocery/settings");
        alert("Password Saved Succesfully");
      }
    });
  }
  axios
    .post("/api/auth" + url, data)
    .then(response => {
      if (response.status === 422) {
        console.log(response.data);
      }
      if (!response.error) {
        return (
          cookie.save("user", response.data.user, { path: "/" }),
          cookie.save("token", response.data.token, { path: "/" }),
          cookie.save("grocery-api", response.data.groceryApi, { path: "/" }),
          this.setState(prevState => {
            return (prevState = def);
          }),
          navigate("/")
        );
      }
    })
    .then(() => this.props.setUser())
    .catch(err => {
      if (err.response.status === 422) {
        return this.props.setError(err.response.data.error);
      } else {
        return this.props.setError("incorrect user name or password");
      }
    });
};
