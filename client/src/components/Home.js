import React from "react";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "./Styles/main.css";
import Menu from "./Menu";
import MenuList from "./MenuList";
import cookie from "react-cookies";

class Home extends React.Component {
  handleLogout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    cookie.remove("grocery-api", { path: "/" });
    navigate("/login");
    this.props.logOutUser();
  };
  render() {
    return (
      <div>
        <NavBar>
          {this.props.user ? (
            <div>
              {this.props.Searchbar}
              <Menu>
                <MenuList
                  header={
                    <Link className="nav-link" to="/">
                      {this.props.user.firstName +
                        " " +
                        this.props.user.lastName || "Home"}
                    </Link>
                  }
                >
                  <Link className="nav-link" to="history">
                    History
                  </Link>
                  <Link className="nav-link" to="favorites">
                    Favorites
                  </Link>
                  <p className="nav-link" onClick={this.handleLogout}>
                    Log Out
                  </p>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div>
              <Link className="nav-link" to="register">
                Register
              </Link>
              <Link className="nav-link" to="login">
                Log In
              </Link>
            </div>
          )}
        </NavBar>
        {this.props.user ? this.props.ListBar : null}
        {this.props.children}
      </div>
    );
  }
}

export default Home;
