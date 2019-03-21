import React from "react";
import "../Styles/menu.css";

class Menu extends React.Component {
  state = {
    expanded: false
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    return (
      <div
        className="menu-anchor"
        onClick={this.handleClick}
        onMouseLeave={this.state.expanded ? this.handleClick : null}
      >
        {this.state.expanded ? this.props.children : null}
        <div id="inner">
          <div id="line" />

          <div id="line" />
        </div>
      </div>
    );
  }
}

export default Menu;
