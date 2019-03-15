import React from "react";
import Home from "./Home";
import Register from "./Register";
import { Router } from "@reach/router";
import Login from "./Login";
import Search from "./Search";
import Searchbar from "./Searchbar";
import Items from "./Items";
import List from "./List";
import ListContainer from "./ListContainer";
import History from "./History";
import Loader from "./Loader";

const Routes = props => {
  const {
    productSearch,
    query,
    handleChange,
    searchSubmit,
    user,
    handleQuantity,
    addToList,
    handleDrag,
    onDragOver,
    handleDrop,
    handleDelete,
    history,
    clearList,
    pageLoad
  } = props;
  return (
    <Router>
      <Home
        path="/"
        user={user}
        Searchbar={
          <Searchbar
            handleChange={handleChange}
            query={query}
            searchSubmit={searchSubmit}
          />
        }
        ListBar={
          <ListContainer
            onDragOver={onDragOver}
            handleDrop={handleDrop}
            clearList={clearList}
            handleMouseUp={props.handleMouseUp}
            handleMouseMove={props.handleMouseMove}
            handleScrollMsDown={props.handleScrollMsDown}
            positionY={props.positionY}
          >
            {pageLoad ? (
              <List history={history} handleDelete={handleDelete} />
            ) : (
              <Loader />
            )}
          </ListContainer>
        }
      >
        <Search
          path="search/:query"
          productSearch={productSearch}
          handleQuantity={handleQuantity}
          addToList={addToList}
          handleDrag={handleDrag}
        />
        {pageLoad ? (
          <History
            path="history"
            history={history}
            pageLoad={pageLoad}
            historyItems={history.map((el, i) => {
              return (
                <div key={el.id} id="list-block">
                  <Items
                    id={el.id}
                    image={el.image}
                    handleDrag={handleDrag.bind(this, el, "history")}
                    title={el.title}
                    addToList={addToList.bind(this, el, "history")}
                    handleQuantity={handleQuantity.bind(this, i, "history")}
                    count={el.count}
                  />
                </div>
              );
            })}
          />
        ) : (
          <Loader path="history" />
        )}
      </Home>
      <Register path="register" />
      <Login path="login" setUser={props.setUser} />
    </Router>
  );
};

export default Routes;
