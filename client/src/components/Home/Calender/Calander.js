import React from "react";
import calander from "./cal";
import { navigate } from "@reach/router";
import Directional from "../../Styles/expand-button.svg";
import CalanderContainer from "./CalanderContainer";
import CalHeadContainer from "./CalHeadContainer";

export const months = [
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
  function handleClick(el, ele, e) {
    if (ele === "") {
      return;
    }
    e.preventDefault();
    navigate("/grocery/addplan/" + el[0] + "/" + el[1] + "/" + ele);
  }
  return (
    <CalanderContainer>
      <CalHeadContainer>
        <h2>
          {mn}, {year}
        </h2>
      </CalHeadContainer>
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
              let data = props.meals.filter(elem => {
                return elem.dow[0] === el[0][0] && elem.dow[1] === el[0][1];
              });
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
                    let newData = data.filter(element => {
                      return element.dow[2] === ele;
                    });
                    if (ele[0] || ele[0] === 0) {
                      return null;
                    }
                    return (
                      <td key={i}>
                        <div
                          className="td"
                          onClick={
                            newData.length > 0
                              ? () =>
                                  navigate("/grocery/meal/" + newData[0]._id)
                              : handleClick.bind(this, el[0], ele)
                          }
                          style={{
                            cursor: "pointer",
                            color: newData.length > 0 ? "red" : null
                          }}
                        >
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
    </CalanderContainer>
  );
};

export default Calander;
