import React, { Component } from "react";
class PtDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      no: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNoChange = this.handleNoChange.bind(this);
    this.FormSubmit = this.FormSubmit.bind(this);
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNoChange(event) {
    this.setState({ no: event.target.value });
  }
  FormSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.FormSubmit}>
        <div>
          Patient Name
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
        </div>
        <div>
          Patient healthcare no
          <input
            type="text"
            onChange={this.handleNoChange}
            value={this.state.no}
          />
        </div>
        <input type="submit" />
      </form>
    );
  }
}
export default PtDetails;
