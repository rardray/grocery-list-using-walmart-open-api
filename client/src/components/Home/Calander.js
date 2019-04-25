import React from "react";
import calander from "./cal";
import Directional from "../Styles/expand-button.svg";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const tHeader = function() {
  return (
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tues</th>
      <th>Weds</th>
      <th>Thurs</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
  );
};
const Calander = props => {
  const mn = months[props.month + props.position];
  const year = props.year + props.yPosition;
  return (
    <div>
      <h2>
        {mn}, {year}
      </h2>
      <div
        className="cal-move"
        id="cal-move-l"
        onClick={props.moveDn}
        style={{
          backgroundImage: `url(${Directional})`,
          transform: "rotate(-90deg)"
        }}
      />
      <div
        className="cal-move"
        id="cal-move-r"
        onClick={props.moveUp}
        style={{
          backgroundImage: `url(${Directional})`,
          transform: "rotate(90deg)"
        }}
      />
      <table>
        <tbody>
          {tHeader()}
          {calander
            .filter(el => {
              return (
                el[0][0] === props.month + props.position &&
                el[0][1] === props.year + props.yPosition
              );
            })
            .map((el, i) => {
              if (
                el[1] === "" &&
                el[2] === "" &&
                el[3] === "" &&
                el[4] === "" &&
                el[5] === "" &&
                el[6] === "" &&
                el[7] === ""
              ) {
                return null;
              }
              return (
                <tr key={i}>
                  {el.map((ele, i) => {
                    if (ele[0] || ele[0] === 0) {
                      return null;
                    }
                    return (
                      <td key={i}>
                        <div className="td">
                          <div className="date">{ele}</div>
                          <div
                            id={
                              ele === props.day &&
                              props.position === 0 &&
                              props.yPosition === 0
                                ? "highlighted"
                                : ""
                            }
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Calander;
