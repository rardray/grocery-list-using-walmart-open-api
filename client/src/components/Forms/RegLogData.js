import React from "react";
import Button from "../ThemedTags/Button";
import Container from "./LogRegContainer";
const formlogic = require("./formlogic");

class RegLogData extends React.Component {
  state = {};

  renderInputs = this.props.renderInputs.bind(this);
  handleChange = formlogic.handleChange.bind(this);
  handleSubmit = formlogic.handleSubmit.bind(
    this,
    this.props.url,
    this.props.state
  );
  componentDidMount() {
    this.setState(prevState => {
      return (prevState = this.props.state);
    });
  }

  render() {
    const { header, subheader, label, types, messages } = this.props;
    const { renderInputs } = this;

    return (
      <>
        <Container header={header} subheader={subheader}>
          {this.props.error}
          {renderInputs(this.state, types, messages)}
          <br />
          <Button label={label} click={this.handleSubmit} />
        </Container>
      </>
    );
  }
}

export default RegLogData;
