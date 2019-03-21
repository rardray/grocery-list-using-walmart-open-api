import React from "react";

const List = props => {
  const {
    history,
    filtervalue,
    sortvalue,
    count,
    buttonLabel,
    grocery
  } = props;
  function comp(a, b) {
    const upA = a[sortvalue];
    const upB = b[sortvalue];
    let compare = 0;
    if (upA > upB) {
      compare = 1;
    } else if (upA < upB) {
      compare = -1;
    }
    return compare * -1;
  }

  const filtered = history.filter((el, i) => {
    return el[filtervalue];
  });
  const sorted = filtered.sort(comp);
  let total = 0;
  for (let i = 0; i < filtered.length; i++) {
    total += filtered[i][count];
  }
  return (
    <div>
      <p>
        Products: {filtered.length} Total Items: {total}
      </p>
      {sorted.map((el, i) => {
        return (
          <div key={el.id} id="list-block">
            <img src={el.image} alt={el.title} />
            <h4>{el.title}</h4>
            <button
              onClick={
                grocery
                  ? props.handleDelete.bind(this, el)
                  : props.addToList.bind(this, i, el)
              }
            >
              {buttonLabel}
            </button>
            <svg
              onClick={props.addFavorite.bind(this, i, el)}
              version="1.1"
              id={el.favorite ? "selected" : "favorite"}
              x="0px"
              y="0px"
              viewBox="0 0 370 370"
            >
              <path
                d="M339.266,65.896c-19.837-19.828-46.206-30.748-74.254-30.748c-16.248,0-31.708,3.528-45.949,10.487l-34.059,16.648
	l-34.07-16.653c-14.237-6.955-29.694-10.483-45.939-10.483c-28.051,0-54.427,10.926-74.273,30.767
	c-19.649,19.652-30.56,45.805-30.72,73.64c-0.16,27.803,10.422,54.059,29.798,73.93c0.824,0.845,1.68,1.662,2.565,2.441
	l121.031,106.963c9.026,7.976,20.316,11.965,31.606,11.965c11.29,0,22.58-3.989,31.606-11.965l121.043-106.972
	c0.888-0.787,1.748-1.602,2.576-2.454c19.365-19.874,29.939-46.127,29.772-73.93C369.831,111.702,358.92,85.555,339.266,65.896z"
              />
            </svg>

            <span>Quantity: {el[count]} </span>
          </div>
        );
      })}
    </div>
  );
};

export default List;
