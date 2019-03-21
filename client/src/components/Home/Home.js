import React from "react";
import Calander from "./Calander";
import "../Styles/home.css";

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
    const { user } = this.props;

    return (
      <div className="home">
        <h4>Welcome, {user.firstName}</h4>
        <Calander {...this} {...this.state} />
      </div>
    );
  }
}

export default Home;
