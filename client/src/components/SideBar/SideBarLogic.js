import React from "react";
import ListContainer from "./ListContainer";
import List from "./List";
import Loader from "../Loader";
import "../Styles/sidebar.css";

class SideBarLogic extends React.Component {
  state = {
    grocery: true
  };

  handleColumn = e => {
    if (e.target.id === "top-links") {
      return;
    } else {
      this.setState({ grocery: !this.state.grocery });
    }
  };
  render() {
    return (
      <div className="sidebar">
        <div id="bar-header">
          <button
            id={this.state.grocery ? "top-links" : "top-unselected"}
            onClick={this.handleColumn}
          >
            Grocery List
          </button>
          <span />
          <button
            id={this.state.grocery ? "top-unselected" : "top-links"}
            onClick={this.handleColumn}
          >
            Favorites
          </button>
        </div>
        <ListContainer
          startPosition={this.state.startPosition}
          onDragOver={this.props.onDragOver}
          handleDrop={this.props.handleDrop}
          clearList={this.props.clearList}
        >
          {" "}
          {this.props.pageLoad ? (
            <List
              history={this.props.history}
              handleDelete={this.props.handleDelete}
              addToList={this.props.addToList}
              grocery={this.state.grocery}
              addFavorite={this.props.addFavorite}
              buttonLabel={this.state.grocery ? "R E M O V E " : "ADD TO CART"}
              filtervalue={this.state.grocery ? "inCart" : "favorite"}
              sortvalue={this.state.grocery ? "addedOn" : "updatedAt"}
              count={this.state.grocery ? "cartCount" : "count"}
            />
          ) : (
            <Loader />
          )}
        </ListContainer>
      </div>
    );
  }
}

export default SideBarLogic;
