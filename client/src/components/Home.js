import React from "react";
import calander from "./cal";
import "./Styles/home.css";

class Home extends React.Component {
  state = {
    year: null,
    month: null,
    day: null,
    position: 0,
    yPosition: 0
  };
  componentDidMount() {
    this.checkDate();
    setInterval(this.checkDate, 1000 * 60 * 60);
  }
  checkDate = () => {
    const n = new Date();
    this.setState({
      year: n.getFullYear(),
      month: n.getMonth(),
      day: n.getDate()
    });
  };
  componentWillUnmount() {
    clearInterval(this.checkDate, 1000 * 60 * 60);
  }
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
  moveUp = () => {
    if (this.state.position + this.state.month === 11) {
      this.setState(prevState => {
        return {
          position: 0 - prevState.month,
          yPosition: prevState.yPosition + 1
        };
      });
    } else {
      this.setState(prevState => {
        return { position: prevState.position + 1 };
      });
    }
  };
  moveDn = () => {
    if (this.state.position + this.state.month === 0) {
      this.setState(prevState => {
        return {
          position: 11 - prevState.month,
          yPosition: prevState.yPosition - 1
        };
      });
    } else {
      this.setState(prevState => {
        return { position: prevState.position - 1 };
      });
    }
  };

  render() {
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
      "Novomber",
      "December"
    ];
    const { user } = this.props;
    const mn = months[this.state.month + this.state.position];
    const year = this.state.year + this.state.yPosition;
    const cal = calander
      .filter(el => {
        return (
          el[0][0] === this.state.month + this.state.position &&
          el[0][1] === this.state.year + this.state.yPosition
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
                    <div id="date">{ele}</div>
                    <div
                      id={
                        ele === this.state.day &&
                        this.state.position === 0 &&
                        this.state.yPosition === 0
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
      });
    return (
      <div className="home">
        <h4>Welcome, {user.firstName}</h4>
        <h2>
          {mn}, {year}
        </h2>
        <button id="cal-move-l" onClick={this.moveDn}>
          {" "}
          {"<"}
        </button>
        <button id="cal-move-r" onClick={this.moveUp}>
          >
        </button>
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
