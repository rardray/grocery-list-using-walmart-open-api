import React from "react";
import "../../Styles/task.css";

const Licon = props => {
  const count = props.cart.reduce(function(acc, curr) {
    return acc + curr.count;
  }, 0);
  return (
    <div className="svg-menu" onClick={props.handleCartIcon}>
      {count ? <div id="notify">{count}</div> : null}
      <img id="icon" src={props.svgs} alt="grocery list" />
    </div>
  );
};

export default Licon;
