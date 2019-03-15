import React from "react";

const History = props => {
  return (
    <div className="list-items">
      <h2>History</h2>
      <p>showing last {props.history.length} items in search history</p>
      {props.historyItems}
    </div>
  );
};

export default History;
