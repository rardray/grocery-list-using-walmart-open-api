import React from "react";
import calander from "./cal";

class Home extends React.Component {
  state = {
    year: null,
    month: null,
    day: null
  };
  componentDidMount() {
    this.checkDate();
    setInterval(this.checkDate, 1000 * 60 * 60);
  }
  checkDate = () => {
    const n = new Date();
    this.setState(
      {
        year: n.getFullYear(),
        month: n.getMonth(),
        day: n.getDate()
      },
      console.log("time")
    );
  };
  tHeader = () => {
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
  render() {
    const cal = calander
      .filter(el => {
        return el[0][0] === this.state.month && el[0][1] === this.state.year;
      })
      .map((el, i) => {
        return (
          <tr key={i}>
            {el.map((ele, i) => {
              if (ele[0]) {
                return null;
              }
              return (
                <td className="td" key={i}>
                  <div id="date">{ele}</div>
                  <div id={ele === this.state.day ? "highlighted" : ""} />
                </td>
              );
            })}
          </tr>
        );
      });
    return (
      <div>
        <table>
          <tbody>
            {this.tHeader()}
            {cal}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
