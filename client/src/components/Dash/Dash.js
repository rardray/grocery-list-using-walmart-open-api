import React from "react";
import NavBar from "./NavBar";
import { Link, navigate } from "@reach/router";
import "../Styles/main.css";
import Menu from "./Menu";
import MenuList from "./MenuList";
import cookie from "react-cookies";
import Licon from "./licon";

class Dash extends React.Component {
  handleLogout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    cookie.remove("grocery-api", { path: "/" });
    navigate("grocery/login");
    this.props.logOutUser();
  };

  handleCartIcon = e => navigate("/grocery/cart");

  render() {
    return (
      <div>
        <NavBar>
          <h1 id="page-title-c">F</h1>
          <h2 id="page-title">undrayz Grocery</h2>
          {this.props.user ? (
            <div>
              {this.props.Searchbar}

              <Licon
                history={this.props.history}
                handleCartIcon={this.handleCartIcon}
              />
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
                  <Link className="nav-link" to="grocery/history">
                    History
                  </Link>
                  <Link className="nav-link" to="grocery/favorites">
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
              <Link className="nav-link-log" to="grocery/register">
                Register
              </Link>
              <Link className="nav-link-log" to="grocery/login">
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

export default Dash;
