import React from "react";
import axios from "axios";
import cookie from "react-cookies";
import "./Styles/main.css";
import Button from "./Styles/Button";
import Input from "./Styles/Input";
const Themes = require("./Styles/Themes");

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state;
    axios.post("/auth/register", data).then(response => {
      cookie.save("user", response.data.user, { path: "/" });
      cookie.save("token", response.data.token, { path: "/" });
    });
  };

  render() {
    return (
      <div style={{ padding: "25%", display: "block", background: "black" }}>
        <div style={Themes.dark.div}>
          <h1>REGISTER NEW ACCOUNT</h1>
          <p>
            All inputs must be filled out. Password must contain at least one
            capitol letter and one numeral.
          </p>
          <Input
            name="firstName"
            value={this.state.firstName}
            type="text"
            handleChange={this.handleChange}
            label={true}
            labelName="First Name"
            errorMessage="First Name Cannot Be Left Blank"
          />
          <Input
            name="lastName"
            value={this.state.lastName}
            type="text"
            handleChange={this.handleChange}
            label={true}
            labelName="Last Name"
            errorMessage="Last Name Cannot Be Left Blank"
          />
          <Input
            name="email"
            value={this.state.email}
            type="email"
            handleChange={this.handleChange}
            label={true}
            labelName="Email Address"
            errorMessage="Must Be a Valid Email Address EX: user@example.org"
          />
          <Input
            name="password"
            value={this.state.password}
            type="password"
            handleChange={this.handleChange}
            label={true}
            labelName="Password"
            errorMessage="Password Must Contain At Least one Upper Case and One Number"
          />
          <br />
          <Button
            label="S I G N  U P"
            theme={Themes.dark}
            click={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Register;
